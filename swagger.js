const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
    },
    
  },

  apis: ['./routes/*.js'], // Path to the API routes folder
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
