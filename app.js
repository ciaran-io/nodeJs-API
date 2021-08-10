const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = express.json();
require('dotenv/config');
app.use(bodyParser);

// Import Routes
const postsRoute = require('./routes/posts');
const homeRoute = require('./routes/index');

app.use('/posts', postsRoute);
app.use('/index', homeRoute);

// 404 responce
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// Set timeout on requests
app.use(function (req, res, next) {
  res.setTimeout(120000, () => {
    console.log('Request has timed out.');
    res.send(408);
  });
  next();
});

// connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
  () => console.log('connected to db')
);

app.listen(3000);
