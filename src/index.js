// src/index.js

'use strict';

module.exports = {
  register() {},

  bootstrap({ strapi }) {
    const websocketMiddleware = require('../middlewares/websocket')({ strapi });
    websocketMiddleware.initialize();
  },
};
