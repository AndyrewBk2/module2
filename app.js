var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var travelRouter = require('./app_server/routes/travel');
var apirouter = require('./app_api/routes/index');  

var handlebars = require('hbs');

var dbURI = 'mongodb://localhost:27017/travlr';  // Database name is 'travlr'

// Connect to MongoDB without deprecated options
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB (travlr)'))
  .catch((err) => console.log('MongoDB connection error: ', err));

var app = express();

// Set views directory correctly
app.set('views', path.join(__dirname, 'app_server', 'views')); 

// View engine setup
app.set('view engine', 'hbs');
handlebars.registerPartials(__dirname + '/app_server/views/partials');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apirouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};  // Show full error only in development

  res.status(err.status || 500);
  res.render('error');  // Render the error page
});

module.exports = app;
