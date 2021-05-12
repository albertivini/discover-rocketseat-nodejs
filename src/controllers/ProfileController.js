const Profile = require('../models/Profile')

module.exports = {
        index(req, res) {
            return res.render('profile', {profile: Profile.get()}) // get() é o método no model de pegar os dados
        },
        update(req, res) {
            const data = req.body

            // semanas por ano
            const WeeksPerYear = 52

            // descobrir media semanas por mes
            const WeeksPerMonth = (WeeksPerYear - data["vacation-per-year"]) / 12
            
            // encontrar total horas por semana
            const WeekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // horas trabalhadas por mes 
            const monthlyTotalHours = WeeksPerMonth * WeekTotalHours

            // calcular valor da hora 
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            // método com o construtor de atualização dos dados
            Profile.update({
                ...Profile.get(),
                ...req.body,
                "value-hour": valueHour
            })

            return res.redirect('/profile')
        }
}