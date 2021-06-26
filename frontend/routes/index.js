var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('homepage', {title:'Marvel Universe'})
});

module.exports = router;
