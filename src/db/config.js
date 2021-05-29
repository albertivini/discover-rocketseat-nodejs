const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
// as chaves servem para pegar apenas a funcionalidade que está dentro dela

// inicialização do banco
module.exports = () => open({
    filename: './database.sqlite',
    // coloca o arquivo do db na raiz do src
    driver: sqlite3.Database
    })
