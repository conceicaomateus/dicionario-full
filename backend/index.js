const express = require("express");
const mongoose = require("mongoose");

const Term = require("./models/Term");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post("/terms", async (req, res) => {
  const { title, description, examples } = req.body;

  const term = {
    title,
    description,
    examples,
  };

  try {
    const response = await Term.create(term);

    res.status(201).json({ Id: response.id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.listen(8000);
  })
  .catch((err) => console.log(err));
