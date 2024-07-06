const WebSocket = require('ws');

module.exports = ({ strapi }) => {
  return {
    initialize() {
      const wss = new WebSocket.Server({ noServer: true });
      console.log("wss",wss)

      wss.on('connection', (ws) => {
        console.log('New WebSocket connection');
        ws.on('message', (message) => {
          console.log('Received:', message.toString());
          ws.send(`Echo: ${message}`);
        });
      });

      strapi.server.httpServer.on('upgrade', (request, socket, head) => {
        console.log("url",request.url)
        if (request.url === '/websocket') {
            console.log("websocket")
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
          });
        } else {
          socket.destroy();
        }
      });

      console.log('WebSocket server initialized');
    }
  };
};
