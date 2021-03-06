var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var app = express();

//Routers
const propertyRouter = require('./routes/propertyRouter');
const cityRouter = require('./routes/cityRouter');
const currencyRouter = require('./routes/currencyRouter');
const propertyTypesRouter = require('./routes/propertyTypesRouter');
const userRouter = require('./routes/userRouter');
const amenitieRouter = require('./routes/amenitieRouter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/property', propertyRouter);
app.use('/api/city', cityRouter);
app.use('/api/currency', currencyRouter);
app.use('/api/propertytype', propertyTypesRouter);
app.use('/api/user', userRouter);
app.use('/api/amenitie', amenitieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
