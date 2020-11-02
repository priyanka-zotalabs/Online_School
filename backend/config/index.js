require("dotenv").config({ path: ".env" });
const sha1 = require("sha1");

const config = {};
config.sessionTimeoutTime = 1800;

config.databaseMicroService = {
  type: "tcp",
  port: process.env.DB_MICROSERVICE_PORT,
  host: "localhost",
  protocol: "http",
  timeout: 180000,
};

config.dbDetails = {
  host: "localhost",
  jestDBName: "jestDB",
  port: 27017,
};
config.appUrl = `${process.env.APP_PUBLIC_URL}`;
config.reactAppUrl = process.env.REACT_APP_URL;

config.role = Object.freeze({
  STUDENT: 1,
  ADMIN: 2,
  TEACHER: 3,
});

config.sms = {
  apiKey: process.env.SMS_API_KEY,
  enable: process.env.SMS_ENABLE,
  basePath: "https://api.textlocal.in/send",
  sender: "ZOTALB",
};

config.space = {
  apiKey: process.env.SPACE_API_KEY,
  secretKey: process.env.SPACE_SECRET_KEY,
  bucket: process.env.SPACE_BUCKET_KEY,
  endPoint: process.env.SPACE_BUCKET_ENDPOINT,
};
config.batchSize = 200;

config.attendeePW = "Attendee@123";
config.moderatorPW = "Moderator@123";
config.classWelcomeMessage = "Welcome to live learning classes";
config.classBannerMessage = "";
config.classModeratorMessage =
  "Hello teacher welcome to live learning classes";
config.classGuestPolicy = "ASK_MODERATOR";

config.createCheckSum = (params) => {
  return sha1(params);
};

config.bigBlueButtonSecretKey = process.env.BBB_SECRET_KEY;
config.bigBlueButtonBaseUrl = process.env.BBB_HOST_URL;

config.stripe_key = process.env.STRIPE_KEY;

config.agora = {
  appID:process.env.agoraAppID,
  appCertificate:process.env.agorAappCertificate
};

module.exports = config;
