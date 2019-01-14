var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')

var myBD = __dirname + "/tweets.json"

/* GET home page. */
router.get('/', (req, res) => res.render('index', {title:"Teste PRI Ex1"}))

router.get('/tweet', (req, res) => {
  jsonfile.readFile(myBD, (erro, tweets) => {
    if(!erro) res.render("lista", {lista: tweets})
    else res.json(erro)
  })
})

router.post("/tweet/guardar", (req,res) => {
  // console.dir(req.body)
  var autor = req.body.autor
  var hash = req.body.hash
  var texto = req.body.texto
  var p = JSON.parse('{"autor":"'+autor+
                      '","hash":"'+hash+
                      '","texto":"'+texto+
                      '","gostos":0'+'}')

  jsonfile.readFile(myBD, (erro, tweets) => {
    if(!erro) {
      tweets.push(p)
      console.dir(tweets)
      jsonfile.writeFile(myBD, tweets, (erro2) => {
        if(!erro2) console.log("Tweet gravado com sucesso!!!")
        else console.log("Erro: " + erro2)
      })
    } 
    else console.log("Erro: " + erro)
  })
  res.json(p)
})

// Apenas tenho o botao 'gosto' e a var de numero de gostos, 
// mas o botão nao faz nada ainda...
router.post('/tweet/gosto/:id', (req, res) => {
  // jsonfile.readFile(myBD, (erro, tweets) => {
  //   if(!erro) res.render("lista", {lista: tweets})
  //   else res.json(erro)
  // })
})

module.exports = router;
