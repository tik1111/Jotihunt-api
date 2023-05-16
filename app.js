var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authentication = require("./middleware/auth");
const authorization = require("./middleware/roleAuthorisation")

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var refreshRouter = require('./routes/refresh');
var welcomeUserRouter = require('./routes/welcome/welcomeUser');
var welcomeTenantAdminRouter = require('./routes/welcome/welcomeTenantAdmin');
var welcomePlatforrmAdminRouter = require('./routes/welcome/welcomePlatformAdmin');
var groupsRouter = require('./routes/groups/groups')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Authentication and refresh routes
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);

//Routes to test authorization
app.use('/welcome/platformadmin', authentication, authorization("platform-admin"),welcomePlatforrmAdminRouter);
app.use('/welcome/tentantadmin', authentication, authorization("tenant-admin"),welcomeTenantAdminRouter);
app.use('/welcome/user', authentication, authorization("user"),welcomeUserRouter);

//Not in user yet
app.use('/users', usersRouter);

//Jotihunt groups
app.use('/groups',authentication, authorization('user'),groupsRouter); 


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
