const Job = require('../models/Job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../models/Profile')

module.exports = {
    index(req, res) {

        const profile = Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: Job.get().length
            // mostra total de jobs dentro do array
        }

        let jobTotalHours = 0

        // Job.get() para pegar o array no model
        const updatedJobs = Job.get().map((job) => {
    
            // JobUtils busca a função no utils
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            // (if ternario) se o prazo for menor ou igual a zero colocar status done, se nao progress

            // pega o conteudo da variavel (done ou progress) e adiciona 1 dependendo de qual for
            // status = done adicionar 1 no statusCount.done, se status = progess adicionar 1 no statusCount.progress
            statusCount[status] += 1

            // (if ternario abaixo)
            /// jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            // coloca o numero de horas diarias dos projetos em andamento na variavel jobTotalHours
            if(status == 'progress') {
                jobTotalHours += Number(job['daily-hours'])
            }

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job)
            }
        })

        // calculo de horas livres por dia
        const freeHours = profile["hours-per-day"] - jobTotalHours
    
        return res.render('index', { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }

}
