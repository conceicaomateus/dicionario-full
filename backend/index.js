const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

mongoose
  .connect("mongodb+srv://root:Z3e0zzjHjNu2OIJd@apicluster.vndlhnm.mongodb.net/dicionario?retryWrites=true&w=majority")
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.listen(8000);
  })
  .catch((err) => console.log(err));
