const Database = require('../db/config')

module.exports = {
    async get() {
        // busca os jobs no banco de dados

        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)
        // run nao funciona com SELECT mas serve pra todo o resto
        // get apenas o primeiro do SELECT
        // all busca tudo q encontrar no banco de dados

        await db.close()

        // normalização dos dados, visto que no banco é underline (_) e no codigo é traço (-)
        // map converte um array em outro array usando os parametros dados
        return jobs.map(job => { // return pro controller
            return { // return pro map
                // em teoria nao precisa deste return pois só tem a estrutura do array 
                // dentro do map, se caso tivesse um if precisaria do return
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
            }
        })

    },
    async update(updatedJob, jobId) {

        const db = await Database()
        
        // função que da update no banco onde o id = id passado no front
        await db.run(`UPDATE jobs SET 
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]} 
        WHERE id = ${jobId}`)
    },
    async delete(id) {

        const db = await Database()
        // deleta da tabela onde o id = id do front
        db.run(`DELETE FROM jobs WHERE id = ${id}`)
        db.close()

    },
    async create(newJob) {

        const db = await Database()

        // inserindo no banco as informações pegas no front end
        await db.run(`INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        db.close()
    }
}