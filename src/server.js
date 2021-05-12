const express = require('express')
const rotas = require('./routes.js')
const path = require('path')

const server = express()
// instancia o servidor express

server.set('view engine', 'ejs')
// habilitar a template engine ejs (isso muda o html pra ejs e possibilita usar javascript no html)

server.set('views', path.join(__dirname, 'views'))
// Localizando a pasta views já que ela está dentro do /src/ 

server.use(express.static("public"))
// habilitar arquivos estáticos

// habilitar o req.body 
server.use(express.urlencoded({ extended: true }))

const port = 3000
// porta 

server.listen(port, () => console.log("Ouvindo na porta 3000"))
// inicia o servidor usando um método de ouvir uma porta

server.use(rotas)
// manda o servidor usar as rotas do arquivo routes.js

