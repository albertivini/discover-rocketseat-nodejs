let data = {
        "name": "Vinicius",
        "avatar": "https://github.com/albertivini.png",
        "monthly-budget": 2000,
        "hours-per-day": 6,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
}

module.exports = {
    get() {
        return data
        // mostra os dados do objeto
    },
    update(NewData) {
        data = NewData
        // atualiza o objeto contendo as informações passadas no construtor
    }
}