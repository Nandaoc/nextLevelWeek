const express = require("express")
const server = express()


//Chamar o banco de dados 

const db = require("./database/db")

//Configurar pasta pública 

server.use(express.static("public"))

//Habilitar o uso do req.body

server.use(express.urlencoded({extended: true}))


//Utilizando template Engine - fazendo a requisição e construindo um objeto nem configure

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar caminhos 
//Página inicial
//req = requisisção e res = resposta

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {

    
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //Inserir dados no banco de dados

        const query = `
            INSERT INTO places (
            image,
            name,
            address, 
            addres2,
            state,
            city,
            items
            ) VALUES (?,?,?,?,?,?,?);
        `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]


     function afterInsertData(err){
        if(err){
          console.log(err)
          return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }
    db.run(query, values, afterInsertData)
  
})


server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //Pesquisa vazia

        return res.render("search-results.html", { total: 0})
    }

    //Pegar dados do banco de dados

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //mostrar página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
        })
})

//Ligar o servidor

server.listen(3000)