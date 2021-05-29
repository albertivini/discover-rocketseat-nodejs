const Database = require('./config')

const initDb = {

    async init() {

        const db = await Database()
        // abre a conexão com o banco
        // usa funcao assincrona pois o js nao espera a inicialização do banco
        // inicialização esta em uma variavel pois ela é necessária para invocar o método exec e run

        // primeiramente deve-se criar as tabelas e isso é feito apenas UMA vez
        // comando SQL precisam estar dentro da crase ``
        // criação da tabela profile
        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`)

        // criação da tabela jobs
        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        // inserindo os meus dados no profile
        await db.run(`INSERT INTO profile(
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Vinicius",
            "https://github.com/albertivini.png",
            2000,
            6,
            5,
            4,
            70
        );`)
        // sera que tem q usar esse ponto e virgula no final msm?

        // inserindo os dados iniciais no jobs
        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizarria Guloso",
            2,
            1,
            1622294361746
        );`)
        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Project",
            3,
            47,
            1622294361746
        );`)

        await db.close()
        // fecha a conexão com o banco
    }
}

initDb.init()
// executando a função