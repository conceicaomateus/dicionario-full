const Term = require("../models/Term");

const List = async (letters) => {
  if (!letters) {
    throw new Error("Informe os filtros corretamente!");
  }

  const regexQueries = letters.map((letter) => ({
    title: { $regex: letter, $options: "i" },
  }));

  const terms = await Term.find({ $or: regexQueries });

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

  return updatedTerm.id;
};

module.exports = {
  List,
  GetById,
  Create,
  Delete,
  Update,
};
