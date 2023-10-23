const express = require("express");
const app = express();
const port = 6969;
const bodyParser = require("body-parser");
const db = require("./connection/connection");
const response = require("./responses/response");

function validateData(req, res, next) { //middleare validasi data
  if (!req.body.nisn || !req.body.nama || !req.body.kelas || !req.body.alamat) {
    return response(400, "Data is incomplete", "Validation Error", res);
  }
  next();
}

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Api Ready To Fight Your Logic !! <br> Api Caught In Fire 🔥");
});

app.get("/biodata", (req, res) => {
  //mencari spesifik berdasarkan params
  const sql = "SELECT * FROM tb_siswa";

  db.query(sql, (error, result) => {
    if (error) throw error; //untuk memotong jika ada error
    response(200, result, "Data Bro wkwk", res);
  });
});

app.get("/biodata/:nisn", (req, res) => {
  const nisn = req.params.nisn;
  const sql = `SELECT nama FROM tb_siswa WHERE nisn = ${nisn}`;

  db.query(sql, (error, result) => {
    if (error) throw error; //untuk memotong jika ada error
    response(200, result, "succes parsing data", res);
  });
});

app.post("/ss", validateData,(req, res) => {
  const { nisn, nama, kelas, alamat } = req.body;
  const sql = `INSERT INTO tb_siswa(id,nisn,nama,kelas,alamat) VALUES(NULL,${nisn},'${nama}','${kelas}','${alamat}')`;

  db.query(sql, (error, result) => {
    if (error) response(404, error.sqlMessage, "Error adding data", res); //untuk memotong jika ada error

    if (result?.affectedRows) {
      const data = {
        IsSucces: result.affectedRows,
        Id: result.insertId,
      };
      response(200, data, "Adding Data Succes", res);
    }
  });
});

app.put("/ss", validateData,(req, res) => {
  const { nisn, nama, kelas, alamat } = req.body;
  const sql = `UPDATE tb_siswa SET nama = '${nama}', kelas = '${kelas}',alamat = '${alamat}' WHERE tb_siswa.nisn = '${nisn}'`;

  db.query(sql, (error, result) => {
    if (error) response(404, error.sqlMessage, "Error update data", res); //untuk memotong jika ada error

    if (result?.affectedRows) {
      const data = {
        IsSucces: result.affectedRows,
      };
      response(200, data, "update Data Succes", res);
    } else {
      response(404, "Data Not Found Cuk", "update Data error", res);
    }
  });
});
app.delete("/sss", (req, res) => {
  const { nisn } = req.body;
  const sql = `DELETE FROM tb_siswa WHERE nisn = '${nisn}'`;

  db.query(sql, (error, result) => {
    if (error) response(404, error.sqlMessage, "Error Delete data", res); //untuk memotong jika ada error

    if (result?.affectedRows) {
      const data = {
        IsSucces: result.affectedRows,
      };
      response(200, data, "Delete Data Succes", res);
    } else {
      response(404, "Data Not Found Cuk", "Delete Data error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`App is Fucking running on port ${port} `);
});
