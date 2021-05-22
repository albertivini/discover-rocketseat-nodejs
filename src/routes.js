const express = require('express')
const rotas = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

rotas.get('/', DashboardController.index)
rotas.get('/job', JobController.job)
rotas.post('/job', JobController.create)
rotas.get('/job/:id', JobController.show)
rotas.post('/job/:id', JobController.update)
rotas.post('/job/delete/:id', JobController.delete)
rotas.get('/profile', ProfileController.index)
rotas.post('/profile', ProfileController.update)


module.exports = rotas