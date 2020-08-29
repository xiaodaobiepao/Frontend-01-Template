var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
console.log('server')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', function(req, res, next) {
//   console.log('daozhele')
//   res.render('test');
//   // res.write('hellolo')
// });

// app.use('/users', usersRouter);

module.exports = app;
