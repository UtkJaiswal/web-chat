module.exports = ({ env }) => ({
    // other configurations
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'your_jwt_secret'),
      },
    },
  });
  