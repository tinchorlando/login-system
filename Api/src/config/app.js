const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("../routes/index.js");

const { COOKIE_SECRET , COOKIE_OPTIONS , FRONT_URL} = process.env;

const baseURL = FRONT_URL || "http://localhost:5173";
const server = express();

server.name = "API";

server.use(bodyParser.json());
server.use(cookieParser(COOKIE_SECRET,COOKIE_OPTIONS));
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", baseURL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.messsage || err;
  console.log(err);
  res.status(status).send(message);
});

module.exports = server;
