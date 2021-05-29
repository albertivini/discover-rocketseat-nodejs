const Job = require('../models/Job');
const JobUtils = require('../utils/jobUtils');
const Profile = require('../models/Profile');

module.exports = {

//const basePath = __dirname + '/views/'
/// cria variavel para simplificar o sendFile

// para abrir uma view usar res.sendFile(__dirname + '/pasta/arquivo')
// para renderizar uma view usar res.render - isso usando ejs como template engine -
/// res.render nao precisa de caminho pois ja busca a view

    job(req, res) {
        return res.render('job')
    },
    async create(req, res) {
        // const job = req.body

        // empurrando o req.body em formato de objeto para o array usando o metodo create    
        await Job.create(
            {
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuindo data de hoje
        })

        return res.redirect('/')
    },
    async show(req, res) {

        const jobs = await Job.get()
        const profile = await Profile.get()

        // req.params.(parametro dentro do :id) serve para pegar o dado na url
        const jobId = req.params.id
        // find para buscar o job que tem esse id e o number para gerar um id em formato de numero em ambos os lados
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        // send pro caso de não ter job com o id buscado
        if(!job) {
            return res.send("Job not found!")
        }

        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render('job-edit', { job })
    },
    async update(req, res) {

        const jobId = req.params.id

        // pega os dados passados pelo front e coloca no array que vai ser enviado para o banco
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        await Job.update(updatedJob, jobId)
        // chama o método de atualizar o array de dados passando a variavel contendo o array de objetos atualizados

        return res.redirect('/job/' + jobId)
    },
    async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)
    // chama o método de deletar o objeto dentro do array a partir do id
    return res.redirect('/')
    }
}