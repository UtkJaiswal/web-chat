const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

module.exports = ({ strapi }) => ({
  initialize() {
    const wss = new WebSocket.Server({ noServer: true });

    wss.on('connection', (ws, req) => {
      console.log('New WebSocket connection');

      // Extract token from query parameters
      const token = new URLSearchParams(req.url.split('?')[1]).get('token');

      // Verify token
      jwt.verify(token, strapi.config.get('plugin.users-permissions.jwtSecret'), (err, decoded) => {
        if (err) {
          ws.close(1008, 'Unauthorized');
        } else {
          ws.user = decoded.id;
        }
      });

      ws.on('message', async (message) => {
        console.log('Received:', message.toString());

        // Save message to database with publishedAt field
        await strapi.query('api::chat-message.chat-message').create({
          data: {
            message: message.toString(),
            user: ws.user,
            publishedAt: new Date(),
          },
        });

        ws.send(`${message}`);
      });
    });

    strapi.server.httpServer.on('upgrade', (request, socket, head) => {
      if (request.url.startsWith('/websocket')) {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    console.log('WebSocket server initialized');
  },
});
