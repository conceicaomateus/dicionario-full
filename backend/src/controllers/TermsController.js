const TermsRepository = require("../repositories/TermsRepository");

const List = async (req, res) => {
  const { letters } = req.body;

  try {
    const terms = await TermsRepository.List(letters);

    res.status(200).json({ items: terms });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const Create = async (req, res) => {
  const { title, description, examples } = req.body;

  try {
    const id = await TermsRepository.Create({ title, description, examples });

    res.status(201).json({ Id: id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const GetById = async (req, res) => {
  const id = req.params.id;

  try {
    const term = await TermsRepository.GetById(id);

    res.status(200).json(term);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const Delete = async (req, res) => {
  const id = req.params.id;

  try {
    await TermsRepository.Delete(id);

    res.status(200).json({ message: "Termo removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const Update = async (req, res) => {
  const id = req.params.id;
  const { title, description, examples } = req.body;

  try {
    const responseId = await TermsRepository.Update({
      id,
      title,
      description,
      examples,
    });

    res.status(200).json({ Id: responseId });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  List,
  Create,
  GetById,
  Update,
  Delete,
};
