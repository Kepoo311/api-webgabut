const express = require('express')
const app = express()
const port = 6969
const bodyParser = require('body-parser')
const db = require('./src/connection/connection')
const response = require('./src/responses/response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    const sql ="SELECT * FROM tb_siswa"

  db.query(sql, (error,result) =>{
    response(200, result, "Data Bro wkwk", res)
  })

})

app.get('/test', (req,res) => {
    const sql =`SELECT nama FROM tb_siswa WHERE nisn = ${req.query.nisn}`

    db.query(sql, (error, result) => {
        response(200, result, "Data Bro wkwk", res)
    })
})

app.post('/log', (req,res)=>{
    const sql = `SELECT nama FROM tb_siswa WHERE nisn = ${req.body.nisn}`
    
    db.query(sql, (error, result) => {
        response(200, result, "Data Bro wkwk", res)
    })
})

app.put('/gg', (req,res) => {
    console.log({ Updata : req.body})
    res.send('Keren Kamu')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})