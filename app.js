var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/registration');
var bannersRouter = require('./routes/banners');
var servicesRouter = require('./routes/services');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profiles');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registration', usersRouter);
app.use('/banner', bannersRouter);
app.use('/services', servicesRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

module.exports = app;
