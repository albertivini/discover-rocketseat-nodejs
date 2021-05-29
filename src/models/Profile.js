const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()
        // inicializa a conexao com o banco
        
        const data = await db.get(`SELECT * FROM profile`)
        // tem q usar o get para buscar, e ele só retorna 1 

        await db.close()
        // fecha a conexao com o banco

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
            // normalizando os dados que vem do banco de dados
            // serve para nao precisar mudar todos os arquivos 
            }
            // mostra os dados do objeto
    },
    async update(newData) {
        // atualiza o objeto contendo as informações passadas no construtor

        const db = await Database()
        
        // ${} = template string
        // da update no id 1 da tabela
        db.run(`UPDATE profile SET 
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["value-hour"]}
        `)

        await db.close()
        
    }
}