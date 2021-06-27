var express = require('express');
var router = express.Router();
var axios = require('axios');
var url = 'http://localhost:3000/'


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(url+'comics')
  .then(response=>{
    res.render('comics', { url:'',title: 'Marvel - Comics',list:response.data,level:req.level});
  })
});

router.get('/:id', function(req, res, next) {
  axios.get(url+'comics/' + req.params.id)
  .then(response=>{
    res.render('comic', {url:'/comics', title: 'Marvel - Comics (' + req.params.id + ' )',list:response.data,level:req.level});
  })
});

router.get('/power/:power', function(req, res, next) {
    axios.get(url+'comics/power/'+req.params.power)
    .then(response=>{
      res.render('comics', {url:'/comics', title: 'Marvel - '+ req.params.power+ ' Comics',list:response.data,level:req.level});
    })
  });

module.exports = router;
