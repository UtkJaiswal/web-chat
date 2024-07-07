'use strict';

/**
 * chat-message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::chat-message.chat-message', ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    // Ensure ctx.query.filters is properly formatted
    ctx.query = {
      ...ctx.query,
      filters: {
        ...ctx.query.filters,
        user: user.id,
      },
    };

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  },
}));
5