let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }
]
// array para guardar os jobs que foram enviados

module.exports = {
    get() {
        return data
        // metodo de mostrar o array de objetos 
    },
    update(newJobs) {
        data = newJobs
        // metodo de atualizar o array de objetos pelo array modificado no controller
    },
    delete(id) {
        // filter serve para tirar do array os dados que forem encontrados
        // se aceitar a condição o valor permanece dentro do objeto, se nao aceitar o valor é retirado
        data = data.filter(job => Number(job.id) !== Number(id))
    },
    create(newJob) {
        // push pega algo novo e insere no array
        data.push(newJob)
    }
}