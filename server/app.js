const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { users, resources, auth } = require('./routes');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );

  next();
});

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/users', users);
app.use('/auth', auth);
app.use('/resources', resources);
app.use('/auth', auth);

module.exports = app;
