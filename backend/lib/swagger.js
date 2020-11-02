const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Eumetry',
    version: '1.0.0',
    description: 'Api Specifications',
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'sid',
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],
  servers: [
    {
      url: `${process.env.APP_PUBLIC_URL}`,
    },
  ],
  tags: []
};

const options = {
  swaggerDefinition,
  apis: ['./routes/**/*.js', './docs/API/**/*.yaml'],
};

module.exports = swaggerJSDoc(options);
