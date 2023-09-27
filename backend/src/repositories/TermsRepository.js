const Term = require("../models/Term");

const List = async (letters) => {
  if (!letters) {
    throw new Error("Informe os filtros corretamente!");
  }

  const regexArray = letters.map((letter) => new RegExp(`^${letter}`, "i"));

  const filter = {
    $or: regexArray.map((regex) => ({ title: { $regex: regex } })),
  };

  const terms = await Term.find(filter).sort({ title: 1 });

  return terms;
};

const GetById = async (id) => {
  const term = await Term.findOne({ _id: id });

  if (!term) {
    throw new Error("Termo não encontrado");
  }

  return term;
};

const Create = async ({ title, description, examples }) => {
  const term = {
    title,
    description,
    examples,
  };

  const response = await Term.create(term);

  return response.id;
};

const Delete = async (id) => {
  const term = await Term.findOne({ _id: id });

  if (!term) {
    throw new Error("Termo não encontrado");
  }

  await Term.deleteOne({ _id: id });
};

const Update = async ({ id, title, description, examples }) => {
  const term = {
    title,
    description,
    examples,
  };

  const updatedTerm = await Term.updateOne({ _id: id }, term);

  if (updatedTerm.matchedCount === 0) {
    throw new Error("Termo não encontrado");
  }

  return id;
};

module.exports = {
  List,
  GetById,
  Create,
  Delete,
  Update,
};
