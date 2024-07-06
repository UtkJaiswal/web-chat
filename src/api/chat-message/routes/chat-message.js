// 1. src/api/chat-message/routes/chat-message.js
module.exports = {
    routes: [
      {
       method: 'GET',
       path: '/chat-messages',
       handler: 'chat-message.find',
       config: {
         policies: [],
         middlewares: [],
       },
      },
      {
        method: 'GET',
        path: '/chat-messages/:id',
        handler: 'chat-message.findOne',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      // Add other routes (POST, PUT, DELETE) as needed
    ],
  };