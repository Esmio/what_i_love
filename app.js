/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorHandler = require('./middlewares/http_error_handler.js');
require('./services/mongodb_connection');

const apiIndex = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'fsafdafsfsfsafdsf',
  resave: true,
  saveUninitialized: true,
}));

app.use('/api', apiIndex);

app.use(errorHandler());

/*
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

/*
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

process.on('unCaughtException', (err) => {
  console.error('err', err);
});

process.on('unHandledReject', (err) => {
  console.error('err', err);
});

module.exports = app;
