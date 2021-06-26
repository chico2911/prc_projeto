var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:3000/personagens')
  .then(response=>{
    res.render('personagens', { title: 'Marvel - Characters',list:response.data });
  })
});

router.get('/power/:power', function(req, res, next) {
  axios.get('http://localhost:3000/personagens/power/'+req.params.power)
  .then(response=>{
    res.render('personagens', {title: 'Marvel - '+ req.params.power+ ' Characters',list:response.data });
  })
});

module.exports = router;
