const Profile = require('../models/Profile');

module.exports = {
    remainingDays(job) {
        // calculo de tempo restante
        // toFixed() transforma numero em inteiro
        // dueDay determina o dia do prazo maximo
        // duedateinms é o dia do prazo maximo em forma de milisegundos
        // timediffinms guarda o dia atual até o ultimo dia do prazo

        const workingDays = (job["total-hours"] / job["daily-hours"]).toFixed() 
        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(workingDays)
        const dueDateInMs = createdDate.setDate(dueDay)
        const timeDiffInMs = dueDateInMs - Date.now()

        const dayInMs = 1000 * 60 * 60 * 24
        // daydiff dias que faltam pra finalizar o projeto
        // math.floor() é parecido com o toFixed(), porem arredondando pra baixo
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        return dayDiff
    },
    calculateBudget: (job) => Profile.get()["value-hour"] * job["total-hours"]
    // profile.get() busca o array no model
}