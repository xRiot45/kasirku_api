// Application
const APP_URL = process.env.APP_URL;
const APP_NAME = process.env.APP_NAME;
const APP_PORT = process.env.APP_PORT;
const APP_ENV = process.env.APP_ENV;

// Database
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_SYNCHRONIZE = process.env.MYSQL_SYNCHRONIZE;

// Jwt
const ACCESS_TOKEN_SECRET = `${process.env.ACCESS_TOKEN_SECRET}`;
const REFRESH_TOKEN_SECRET = `${process.env.REFRESH_TOKEN_SECRET}`;

export {
  APP_URL,
  APP_NAME,
  APP_PORT,
  APP_ENV,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_SYNCHRONIZE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};
