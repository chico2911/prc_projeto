var express = require('express');
var router = express.Router();
var axios = require('axios');
var url = 'http://localhost:3000/'


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(url+'personagens')
  .then(response=>{
    res.render('personagens', { title: 'Marvel - Characters',list:response.data,level:req.level});
  })
});

router.get('/:id', function(req, res, next) {
  axios.get(url+'personagens/' + req.params.id)
  .then(response=>{
    res.render('personagem', { title: 'Marvel - Characters (' + req.params.id + ' )',list:response.data,level:req.level});
  })
});

router.get('/power/:power', function(req, res, next) {
  axios.get(url+'personagens/power/'+req.params.power)
  .then(response=>{
    res.render('personagens', {title: 'Marvel - '+ req.params.power+ ' Characters',list:response.data,level:req.level});
  })
});

module.exports = router;
