//Importar a dependência do sqlite3

const sqlite3 = require("sqlite3").verbose()
 
//Iniciar o objeto que irá fazer operações no banco de dados 

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//Utilizar o objeto de banco de dados para as operações

//db.serialize(() => {
    //Criar uma tabela com comandos SQL
  //  db.run(`
    //    CREATE TABLE IF NOT EXISTS places (
      //      id INTEGER PRIMARY KEY AUTOINCREMENT,
        //    image TEXT,
          //  name TEXT,
           // address TEXT,
            //addres2 TEXT,
            //state TEXT,
            //city TEXT,
            //items TEXT
        //);
    //`)

    //Iserir dados na tabela

    //const query = `
      //  INSERT INTO places (
        //    image,
          //  name,
            //address, 
            //addres2,
            //state,
            //city,
            //items
      //  ) VALUES (?,?,?,?,?,?,?);
    //`

    //const values = [
        //"https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        //"Papersider",
        //"Guilherme Gembala, Jardim América",
        //"Número 260",
        //"Santa Catarina",
        //"Rio do Sul",
      //  "Papéis"
    //]

   // function afterInsertData(err){
        //if(err){
          //  return console.log(err)
        //}

        //console.log("Cadastrado com sucesso")
      //  console.log(this)
    //}

  //  db.run(query, values, afterInsertData)

        //Concultar dados na tabela

        //db.all(`SELECT * FROM places`, function(err, rows){
          //  if(err){
            //    return console.log(err)
            //}

            //console.log("Aqui estão seus registros")
            //console.log(rows)
        //})

        //Deletar dados da tabela

       db.run(`DELETE FROM places WHERE id = ?`, [5], function(err){
          if(err){
            return console.log(err)
            }

            console.log("REgistro deletado com sucesso")
        })
//})