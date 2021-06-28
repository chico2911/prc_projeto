var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  console.log(req.level)
  res.render('homepage', {title:'Marvel Universe',level:req.level})
});

router.get('/login', function(req, res, next) {
  res.cookie('url','http://localhost:3001/'+req.url)
  res.redirect('http://localhost:5000/login')
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('token');
  res.redirect('http://localhost:3001/')
});

router.get('/adicionarPersonagem', function(req, res, next) {
  if(req.level == 1){
    res.render('adicionarPersonagem',{title:'Admin - Add Character',level:req.level});
  }
  else{
    res.redirect('/')
  }
});

router.get('/adicionarComic', function(req, res, next) {
  if(req.level == 1){
    res.render('adicionarComic',{title:'Admin - Add Comic',level:req.level});
  }
  else{
    res.redirect('/')
  }
});

router.post('/adicionarPersonagem', function(req, res, next) {
  axios.post('http://api:3000/personagens',req.body)
  .then(response=>{
    res.status(200).json({msg:'sucess'})
  })
  .catch(err=>{res.status(500).json({msg:'error'})})
  
});

router.post('/adicionarComic', function(req, res, next) {
    axios.post('http://api:3000/comics',req.body)
    .then(response=>{
      res.status(200).json({msg:'sucess'})
    })
    .catch(err=>{console.log(err);res.status(500).json({msg:'error'})})
});


module.exports = router;
