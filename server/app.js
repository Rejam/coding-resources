const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: 'Secret' }));
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

module.exports = app;
