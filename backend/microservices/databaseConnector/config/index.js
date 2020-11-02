const config = {};

config.databaseMicroService = {
  type: 'tcp',
  port: process.env.DB_MICROSERVICE_PORT,
  host: 'localhost',
  protocol: 'http',
  timeout: 180000,
};

config.dbDetails = {
  host: process.env.DB_HOST,
  DBName: process.env.DB_NAME || 'demo',
  port: process.env.DB_PORT,
};

module.exports = config;
