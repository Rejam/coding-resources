const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  "access-control-allow-origin": '*'
}));
app.options('*', cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// auth
require('./auth')(app);

// Routes
require('./routes')(app);

module.exports = app;
