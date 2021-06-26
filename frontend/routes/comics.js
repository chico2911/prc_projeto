var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:3000/comics')
  .then(response=>{
    res.render('comics', { url:'',title: 'Marvel - Comics',list:response.data });
  })
});

router.get('/power/:power', function(req, res, next) {
    axios.get('http://localhost:3000/comics/power/'+req.params.power)
    .then(response=>{
      res.render('comics', {url:'/comics', title: 'Marvel - '+ req.params.power+ ' Comics',list:response.data });
    })
  });

module.exports = router;
