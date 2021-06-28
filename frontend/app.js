var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon')
var axios = require('axios');

var personagensRouter = require('./routes/personagens');
var comicsRouter = require('./routes/comics');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
const { response } = require('express');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.cookies.token == null) {
      req.level=0
      next()
  } else { // authentication
      axios.post('http://auth:5000/verifyToken',{token:req.cookies.token})
      .then(response=>{
        if(response.status == 200){
          req.level = 1
          next()
        }
        else{res.redirect('/')}
      })
      .catch(e=>{res.clearCookie('token'); res.redirect('/')})
  }
})





app.use('/personagens', personagensRouter);
app.use('/comics', comicsRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

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
