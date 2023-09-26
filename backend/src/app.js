const express = require('express');
const cors = require('cors');
const router = require('./config/router');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app;