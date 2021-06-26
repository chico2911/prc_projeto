var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('homepage', {title:'Marvel Universe'})
});

router.get('/login', function(req, res, next) {
  res.cookie('url','http://localhost:3001/'+req.url)
  res.redirect('http://localhost:5000/login')
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('token');
  res.redirect('http://localhost:3000/')
});

module.exports = router;
