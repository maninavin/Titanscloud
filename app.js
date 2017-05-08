var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var http = require('http');
var passport = require('passport');
var mysql     =    require('mysql');
var Auth0Strategy = require('passport-auth0');

dotenv.load();

var routes = require('./routes/index');
var customer_services= require('./routes/customer_services');
var development= require('./routes/development');
var update= require('./routes/update');
var Finance= require('./routes/Finance');
var Research= require('./routes/Research');
var Human_Resources = require('./routes/Human_Resources');
var Marketing = require('./routes/Marketing');
var user = require('./routes/user');
var Quality_Management = require('./routes/Quality_Management');
var Sales = require('./routes/Sales');
var Production = require('./routes/Production');

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', 8081);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', user);
app.use('/customer_services',customer_services);
app.use('/development',development);
app.use('/update',update);
app.use('/Finance',Finance);
app.use('/Human_Resources',Human_Resources);
app.use('/Marketing',Marketing);
app.use('/Production',Production);
app.use('/Research',Research);
app.use('/Sales',Sales);
app.use('/Quality_Management',Quality_Management);



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
http.createServer(app).listen(app.get('port'), function(){
  console.log('Listening on Port ' + app.get('port'));
});


module.exports = app;
