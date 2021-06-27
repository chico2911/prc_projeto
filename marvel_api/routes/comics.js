var express = require('express');
var router = express.Router();
var axios = require('axios');
var gdb =require('../utils/graphdb')

/* GET comics by Power. */
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

router.get('/:id',async function(req, res, next) {
  id = req.params.id
  query = 'select ?issueNumber ?title ?personagens ?nameP where {:'+id+' a :Comic; :issueNumber ?issueNumber; :title ?title. OPTIONAL{:'+id+' :temPersonagem ?personagens. ?personagens :name ?nameP}.}'
  var result = await gdb.execQuery(query);
  console.log(result.results.bindings)
  var dados = result.results.bindings.map(c => {
    if(c.personagens!=null){
      return{
        idP : c.personagens.value.split('#')[1],
        nameP: c.nameP.value
    }
  }})
  if(dados[0]==undefined){
    dados =[]
  }
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
  query = 'select ?comics ?issueNumber ?title where {?comics a :Comic; :issueNumber ?issueNumber; :title ?title}'
  var result = await gdb.execQuery(query);
  var dados = result.results.bindings.map(c => {
    return {
      id: c.comics.value.split('#')[1],
      issueNumber: c.issueNumber.value,
      title: c.title.value
      }
  }
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

router.post('/',async function(req,res,next){
  req.body.id = 'ac' + Date.now();
  var myquery = `INSERT DATA {
    :${req.body.id} rdf:type owl:NamedIndividual , :Comic ;
    :title "${req.body.title}" ;
    :issueNumer "${req.body.issueNumber}" .
  }`;
  var result = await gdb.execTransaction(myquery);  
  res.status(200).jsonp("Triplos inseridos ... " + myquery);
})

module.exports = router;