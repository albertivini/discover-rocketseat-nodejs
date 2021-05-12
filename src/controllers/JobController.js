const Job = require('../models/Job');
const JobUtils = require('../utils/jobUtils');

module.exports = {

//const basePath = __dirname + '/views/'
/// cria variavel para simplificar o sendFile

// para abrir uma view usar res.sendFile(__dirname + '/pasta/arquivo')
// para renderizar uma view usar res.render - isso usando ejs como template engine -
/// res.render nao precisa de caminho pois ja busca a view

    index(req, res) {

        // Job.get() para pegar o array no model
        const updatedJobs = Job.get().map((job) => {

            // JobUtils busca a função no utils
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            // (if ternario) se o prazo for menor ou igual a zero colocar status done, se nao progress
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job)
            }
        })
    
        return res.render('index', { jobs: updatedJobs })
    },
    job(req, res) {
        return res.render('job')
    },
    create(req, res) {
        // ? é o optional chaining
        const lastId = Job.get()[Job.get().length - 1]?.id || 0
        // encontra o ultimo Id do array, se não encontrar (visto que 0 - 1 = undefined) dar o valor 1
        // const job = req.body
    
        Job.get().push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuindo data de hoje
        })
        // empurrando o req.body em formato de objeto para o array usando o push
        return res.redirect('/')
    },
    show(req, res) {
        // req.params.(parametro dentro do :id) serve para pegar o dado na url
        const jobId = req.params.id
        // find para buscar o job que tem esse id e o number para gerar um id em formato de numero em ambos os lados
        const job = Job.get().find(job => Number(job.id) === Number(jobId))
        // send pro caso de não ter job com o id buscado
        if(!job) {
            return res.send("Job not found!")
        }

        job.budget = JobUtils.calculateBudget(job)

        return res.render('job-edit', { job })
    },
    update(req, res) {
        const jobId = req.params.id
        const job = Job.get().find(job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.send("Job not found!")
        }

        // ... espalhar os itens que pertencem ao job dentro do novo objeto e depois sobrescrever com os dados do req.body
        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        Job.data = Job.data.map(job => {
            if(Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        return res.redirect('/job/' + jobId)
    },
    delete(req, res) {
    const jobId = req.params.id

    // filter serve para tirar do array os dados que forem encontrados
    // se aceitar a condição o valor permanece dentro do objeto, se nao aceitar o valor é retirado
    Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

    return res.redirect('/')
    }
}