var express = require('express');
var router = express.Router();
var axios = require('axios');
var gdb =require('../utils/graphdb')

/* GET personagens by Power. */
router.get('/power/:power',async function(req, res, next) {
  power = req.params.power
  query = 'select DISTINCT ?p ?alignment ?combat ?durability ?eyecolor ?gender ?haircolor ?height ?intelligence ?name ?power ?publisher ?race ?skincolor ?speed ?strength ?total ?weight where  {?p a :Personagem; :temPoder :'+power+'. OPTIONAL{?p :alignment ?alignment}. OPTIONAL{?p :combat ?combat}. OPTIONAL{?p :durability ?durability}.  OPTIONAL{?p :eyecolor ?eyecolor}. OPTIONAL{?p :gender ?gender}. OPTIONAL{?p :haircolor ?haircolor}. OPTIONAL{?p :height ?height}. OPTIONAL{?p :intelligence ?intelligence}. OPTIONAL{?p :name ?name}. OPTIONAL{?p :power ?power}. OPTIONAL{?p :publisher ?publisher}. OPTIONAL{?p :race ?race}. OPTIONAL{?p :skincolor ?skincolor}. OPTIONAL{?p :speed ?speed}. OPTIONAL{?p :strength ?strength}. OPTIONAL{?p :total ?total}. OPTIONAL{?p :weight ?weight}}'
  var result = await gdb.execQuery(query);
  var dados = parsePersonagensResult(result)
  res.status(200).jsonp(dados);
});

/*Get Personagens pelo id de uma comic*/
router.get('/comic/:id',async function(req, res, next) {
  id = req.params.id
  query = 'select DISTINCT ?p ?alignment ?combat ?durability ?eyecolor ?gender ?haircolor ?height ?intelligence ?name ?power ?publisher ?race ?skincolor ?speed ?strength ?total ?weight where  {?p a :Personagem; :apareceEm :'+id+'. OPTIONAL{?p :alignment ?alignment}. OPTIONAL{?p :combat ?combat}. OPTIONAL{?p :durability ?durability}.  OPTIONAL{?p :eyecolor ?eyecolor}. OPTIONAL{?p :gender ?gender}. OPTIONAL{?p :haircolor ?haircolor}. OPTIONAL{?p :height ?height}. OPTIONAL{?p :intelligence ?intelligence}. OPTIONAL{?p :name ?name}. OPTIONAL{?p :power ?power}. OPTIONAL{?p :publisher ?publisher}. OPTIONAL{?p :race ?race}. OPTIONAL{?p :skincolor ?skincolor}. OPTIONAL{?p :speed ?speed}. OPTIONAL{?p :strength ?strength}. OPTIONAL{?p :total ?total}. OPTIONAL{?p :weight ?weight}}'
  var result = await gdb.execQuery(query);
  var dados = parsePersonagensResult(result)
  res.status(200).jsonp(dados);
});

/* GET personagem by id. */
router.get('/:id',async function(req, res, next) {
  id = req.params.id
  query = 'select ?alignment ?combat ?durability ?eyecolor ?gender ?haircolor ?height ?intelligence ?name ?power ?publisher ?race ?skincolor ?speed ?strength ?total ?weight where  {:'+id+' a :Personagem. OPTIONAL{:'+id+' :alignment ?alignment}. OPTIONAL{:'+id+' :combat ?combat}. OPTIONAL{:'+id+' :durability ?durability}.  OPTIONAL{:'+id+' :eyecolor ?eyecolor}. OPTIONAL{:'+id+' :gender ?gender}. OPTIONAL{:'+id+' :haircolor ?haircolor}. OPTIONAL{:'+id+' :height ?height}. OPTIONAL{:'+id+' :intelligence ?intelligence}. OPTIONAL{:'+id+' :name ?name}. OPTIONAL{:'+id+' :power ?power}. OPTIONAL{:'+id+' :publisher ?publisher}. OPTIONAL{:'+id+' :race ?race}. OPTIONAL{:'+id+' :skincolor ?skincolor}. OPTIONAL{:'+id+' :speed ?speed}. OPTIONAL{:'+id+' :strength ?strength}. OPTIONAL{:'+id+' :total ?total}. OPTIONAL{:'+id+' :weight ?weight}}'
  var result = await gdb.execQuery(query);
  var dados = await getPersonagem(result,id)
  res.status(200).jsonp(dados);
});

/* GET all personagens. */
router.get('/', async function(req, res, next) {
  query = 'select DISTINCT ?p ?alignment ?combat ?durability ?eyecolor ?gender ?haircolor ?height ?intelligence ?name ?power ?publisher ?race ?skincolor ?speed ?strength ?total ?weight where  {?p a :Personagem. OPTIONAL{?p :alignment ?alignment}. OPTIONAL{?p :combat ?combat}. OPTIONAL{?p :durability ?durability}.  OPTIONAL{?p :eyecolor ?eyecolor}. OPTIONAL{?p :gender ?gender}. OPTIONAL{?p :haircolor ?haircolor}. OPTIONAL{?p :height ?height}. OPTIONAL{?p :intelligence ?intelligence}. OPTIONAL{?p :name ?name}. OPTIONAL{?p :power ?power}. OPTIONAL{?p :publisher ?publisher}. OPTIONAL{?p :race ?race}. OPTIONAL{?p :skincolor ?skincolor}. OPTIONAL{?p :speed ?speed}. OPTIONAL{?p :strength ?strength}. OPTIONAL{?p :total ?total}. OPTIONAL{?p :weight ?weight}}'
  var result = await gdb.execQuery(query);
  dados = parsePersonagensResult(result)
  res.status(200).jsonp(dados);
});


function parsePersonagensResult(result){
    var dados = result.results.bindings.map(c => {
        return {
            id: c.p.value.split('#')[1],
            alignment : (c.alignment) ? c.alignment.value : 'N/A',
            combat :(c.combat) ? c.combat.value : 'N/A',
            durability :(c.durability) ? c.durability.value : 'N/A',
            eyecolor :(c.eyecolor) ? c.eyecolor.value : 'N/A',
            gender :(c.gender)?c.gender.value : 'N/A',
            haircolor :(c.haircolor) ? c.haircolor.value : 'N/A',
            height :(c.height) ? c.height.value : 'N/A',
            intelligence : (c.intelligence)? c.intelligence.value : 'N/A',
            name : (c.name)? c.name.value : 'N/A',
            power : (c.power)? c.power.value : 'N/A',
            publisher : (c.publisher)? c.publisher.value : 'N/A',
            race : (c.race)? c.race.value : 'N/A',
            skincolor : (c.skincolor)? c.skincolor.value : 'N/A',
            speed : (c.speed)? c.speed.value : 'N/A',
            strength : (c.strength)? c.strength.value : 'N/A',
            total : (c.total)? c.total.value : 'N/A',
            weight : (c.weight)? c.weight.value : 'N/A',
          }
      })
    return dados  
}

async function getPersonagem(result,id){
  query = 'select ?apareceEm ?temPoder where {:'+id+' a :Personagem; :temPoder ?temPoder; OPTIONAL{:'+id+' :apareceEm ?apareceEm}}'
  var newResult = await gdb.execQuery(query);
  temPoder = []
  apareceEm = []
  newResult.results.bindings.map(c=>{
    console.log(c)
    if (!temPoder.includes(c.temPoder.value.split('#')[1])){
      temPoder.push(c.temPoder.value.split('#')[1])
    }
    if(c.apareceEm){
      if (!apareceEm.includes(c.apareceEm.value.split('#')[1])){
        apareceEm.push(c.apareceEm.value.split('#')[1])
      }
    }
  })
  var dados = result.results.bindings.map(c => {
    return {
        id: id,
        alignment : (c.alignment) ? c.alignment.value : 'N/A',
        combat :(c.combat) ? c.combat.value : 'N/A',
        durability :(c.durability) ? c.durability.value : 'N/A',
        eyecolor :(c.eyecolor) ? c.eyecolor.value : 'N/A',
        gender :(c.gender)?c.gender.value : 'N/A',
        haircolor :(c.haircolor) ? c.haircolor.value : 'N/A',
        height :(c.height) ? c.height.value : 'N/A',
        intelligence : (c.intelligence)? c.intelligence.value : 'N/A',
        name : (c.name)? c.name.value : 'N/A',
        power : (c.power)? c.power.value : 'N/A',
        publisher : (c.publisher)? c.publisher.value : 'N/A',
        race : (c.race)? c.race.value : 'N/A',
        skincolor : (c.skincolor)? c.skincolor.value : 'N/A',
        speed : (c.speed)? c.speed.value : 'N/A',
        strength : (c.strength)? c.strength.value : 'N/A',
        total : (c.total)? c.total.value : 'N/A',
        weight : (c.weight)? c.weight.value : 'N/A',
        temPoder: temPoder,
        apareceEm: apareceEm
      }
  })
  return dados  
}


module.exports = router;