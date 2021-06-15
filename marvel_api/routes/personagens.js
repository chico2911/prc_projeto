var express = require('express');
var router = express.Router();
var axios = require('axios');
var gdb =require('../utils/graphdb')

/* GET personagem by Power. */
router.get('/power/:power',async function(req, res, next) {
  query = 'select DISTINCT ?comic ?issueNumber ?title where {?comic a :Comic; :issueNumber ?issueNumber; :title ?title; :temPersonagem ?personagens. ?personagens :temPoder :'+req.params.power+'}'
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
      id: c.comic.value.split('#')[1],
      issueNumber: c.issueNumber.value,
      title: c.title.value
      }
  }
)
  res.status(200).jsonp(dados);
});

router.get('/personagem/:id',async function(req, res, next) {
  query = 'select DISTINCT ?comic ?issueNumber ?title where {?comic a :Comic; :issueNumber ?issueNumber; :title ?title; :temPersonagem :'+req.params.id+'.}'
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
      id: c.comic.value.split('#')[1],
      issueNumber: c.issueNumber.value,
      title: c.title.value
      }
  }
)
  res.status(200).jsonp(dados);
});

/* GET comic by id. */
router.get('/:id',async function(req, res, next) {
  id = req.params.id
  query = 'select ?issueNumber ?title ?personagens ?nameP where {:'+id+' a :Comic; :issueNumber ?issueNumber; :title ?title; :temPersonagem ?personagens. ?personagens :name ?nameP}'
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return{
      idP : c.personagens.value.split('#')[1],
      nameP: c.nameP.value
    }
  })
  comic = {
    id: req.params.id,
    title: result.results.bindings[0].title.value,
    issueNumber: result.results.bindings[0].issueNumber.value,
    personagens:dados
  }
  res.status(200).jsonp(comic);
});

/* GET all comics. */
router.get('/', async function(req, res, next) {
  query = ```select DISTINCT ?p ?alignment ?combat ?durability ?apareceEm ?eyecolor ?gender ?haircolor ?height ?intelligence ?name ?power ?publisher ?race ?skincolor ?speed ?strength ?temPoder ?total ?weight where 
  {?p a :Personagem;
  :alignment ?alignment;
    :combat ?combat;
  :durability ?durability;
   :eyecolor ?eyecolor;
    :gender ?gender;
  :haircolor ?haircolor;
  :height ?height;
  :intelligence ?intelligence;
  :name ?name;
  :power ?power;
  :publisher ?publisher;
  :race ?race;
  :skincolor ?skincolor;
  :speed ?speed;
  :strength ?strength;
  :temPoder ?temPoder;
  :total ?total;
  :weight ?weight.
OPTIONAL{?p :apareceEm ?apareceEm}```
  var result = await gdb.execQuery(query);

)
  res.status(200).jsonp(dados);
});

router.get('/search/:title', async function(req,res,next){
  query = ```select DISTINCT ?comics ?issueNumber ?title 
	where {?comics a :Comic; 
           :issueNumber ?issueNumber;
    		:title ?title
    FILTER regex(?title, "```+req.params.title+```")}```
    var result = await gdb.execQuery(query);
    var dados = result.results.bindings.map(c => {
      return {
        id: c.comics.value.split('#')[1],
        issueNumber: c.issueNumber.value,
        title: c.title.value
        }
    })
    res.status(200).jsonp(dados);
})


function parsePersonagemResult(result){
    var lista = new Map();
    var dados = result.results.bindings.map(c => {
        return {
            id: c.p.value.split('#')[1],
            alignment :c.alignment.value,
            combat :c.combat.value,
            durability :c.durability.value,
            eyecolor :c.eyecolor.value,
            gender :c.gender.value,
            haircolor :c.haircolor.value,
            height :c.height.value,
            intelligence :c.intelligence.value,
            name :c.name.value,
            power :c.power.value,
            publisher :c.publisher.value,
            race :c.race.value,
            skincolor :c.skincolor.value,
            speed :c.speed.value,
            strength :c.strength.value,
            temPoder :c.temPoder.value,
            total :c.total.value,
            weight :c.weight.value,
            apareceEm: c.apareceEm.value
          }
      })
    dados.forEach(personagem =>{
        if(lista.get(personagem)){
            
        }
    })  
}


module.exports = router;