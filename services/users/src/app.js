const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/user');

const app = express();

// allow cross-origin access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/users', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers development error handler will print stacktrace
if (app.get('env') === 'development') {
  app
    .use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({message: err.message, error: err});
    });
}

// production error handler no stacktraces leaked to user
app
  .use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message, error: {}});
  });

module.exports = app;