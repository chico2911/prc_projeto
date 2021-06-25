var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/personagens', function(req, res, next) {
  res.render('personagens', { title: 'Marvel - Personagens' });
});

module.exports = router;
