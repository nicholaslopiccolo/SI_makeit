const PORT = '3080'
var compression = require('compression');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var randomstring = require("randomstring");
var cookieSession = require('cookie-session');

var logger = require('morgan');
var rateLimit = require('express-rate-limit');
var limiter = new rateLimit({ // Limit the api requests
  windowMs: 10 * 60 * 1000, // 10 minutes 
  max: 500, // limit each IP to 500 requests per windowMs 
});
var helmet = require('helmet')

var indexRouter = require('./routes/index.js');

var http = require('http');
var app = require('express')();

app.use(compression());
app.use(limiter);

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());

app.use(helmet());
app.use(express.urlencoded({
    extended: false
}));
app.set('trust proxy', 1); // trust first proxy

app.use(cookieSession({
  name: 'session',
  secret: randomstring.generate(),
  httpOnly: false,
  maxAge: 7 * (24 * 60 * 60 * 1000),//(day) * number
  secure: false,// set true before push
  overwrite: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.html');
});

http.createServer(app).listen(PORT, function () {
    console.log('Server is running...');
});
