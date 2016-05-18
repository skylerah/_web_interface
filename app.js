const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const mongodbStore = require('connect-mongo')(session);

const routes = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const register = require('./routes/register');
const play = require('./routes/play');
const characters = require('./routes/characters');

//database config
var dbConfig = require('./config/database');
var passportConfig = require('./config/passport');

//app initialization
var app = express();

//database connection
mongoose.connect('mongodb://localhost:27017/MMO_PROJECT');
var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  name: 'xpressBlu.sess', store: new mongodbStore(
    {
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600}),
    secret: 'qwertyuiop123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 15}
  }));

app.use('/', routes);
app.use('/login', login);
app.use('/register', register);
app.use('/play', play);
app.use('/characters', characters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
