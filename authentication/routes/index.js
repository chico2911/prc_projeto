var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var User = require('../controllers/users');


/* GET home page. */
router.get(['/login','/'], function(req, res, next) {
  res.render('login', { title: 'Marvel - Login' });
});

router.post('/login', function(req, res, next) {
  User.lookUp(req.body._id).then((dados) => {
    const user = dados;
    if (! user) {
      res.render('loginError', { title: 'Login',error:'Utilizador não encontrado' });
    } else {
        if (req.body.password == user.password) {
            jwt.sign({
                _id: user._id
            }, "prc2021", {
                expiresIn: "1d"
            }, function (err, token) {
                if (err) {
                  res.render('loginError', { title: 'Login',error:'Não foi possível fazer login.' });
                } else {
                  res.cookie('token', token)
                  res.redirect('http://localhost:3001')
                }
            });
        } else {
          res.render('loginError', { title: 'Login',error:'Password Errada' });
        }
    }
});
});

router.post("/signup", function (req, res) {
  var user = req.body;
  console.log(user)
  User.insereUser(user).then(() => {
      res.redirect('/login')
  }).catch((err) => {
      res.status(500).jsonp({error: err})
  });
  
});

router.post('/verifyToken', function(req,res){
  var token = req.body.token;
  jwt.verify(token, 'prc2021', function (e, payload) {
    if (e) {
        res.status(403).jsonp({msg:"JWT is not valid."})
    } else {
        res.status(200).jsonp({msg:'JWT is valid',level:payload.level});
    }
  })
})

module.exports = router;
