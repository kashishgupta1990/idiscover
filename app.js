var express = require('express')
var path = require('path')

var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport');
var authenticate = require('./authenticate');


var t1 = require('./routes/t1')
var t2 = require('./routes/t2')
var t3 = require('./routes/t3')
var t4 = require('./routes/t4')
var t5 = require('./routes/t5')
var t6 = require('./routes/t6')
var t7 = require('./routes/t7')
var t8 = require('./routes/t8')
var t9 = require('./routes/t9')
var type = require('./routes/')

var app = express()


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)
app.use('/t1', t1)
app.use('/t2', t2)
app.use('/t3', t3)
app.use('/t4', t4)
app.use('/t5', t5)
app.use('/t6', t6)
app.use('/t7', t7)
app.use('/t8', t8)
app.use('/t9', t9)


app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})


if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}


app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


app.all('*', function(req, res, next){
    console.log('req start: ',req.secure, req.hostname, req.url, app.get('port'));
  if (req.secure) {
    return next();
  };

 res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
});

module.exports = app
