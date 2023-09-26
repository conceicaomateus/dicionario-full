const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const Term = require("./models/Term");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post("/terms/create", async (req, res) => {
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

app.post("/terms/list", async (req, res) => {
  const { filters } = req.body;

  const { letters } = filters;

  try {
    if(!letters) {
      res.status(422).json({ message: "Informe os filtros corretamente!" });
      return;
    }

    const terms = await Term.find({
      title: { $regex: `^${letters}`, $options: "i" },
    });

    res.status(200).json({ terms: terms });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/terms/getById/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const term = await Term.findOne({ _id: id });

    if (!term) {
      res.status(422).json({ message: "Termo não encontrado" });
      return;
    }

    res.status(200).json({ term: term });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.patch("/terms/update/:id", async (req, res) => {
  const id = req.params.id;

  const { title, description, examples } = req.body;

  const term = {
    title,
    description,
    examples,
  };

  try {
    const updatedTerm = await Term.updateOne({ _id: id }, term);

    if (updatedTerm.matchedCount === 0) {
      res.status(422).json({ message: "Termo não encontrado!" });
      return;
    }

    res.status(200).json({ Id: response.id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/terms/delete/:id", async (req, res) => {
  const id = req.params.id;

  const term = await Term.findOne({ _id: id });

  if (!term) {
    res.status(422).json({ message: "Termo não encontrado" });
    return;
  }

  try {
    await Term.deleteOne({ _id: id });

    res.status(200).json({ message: "Termo removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
