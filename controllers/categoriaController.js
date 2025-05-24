const categoriaService = require("../services/categoriaService");

// Lista todas as categorias cadastradas
exports.listar = async (req, res) => {
  const categorias = await categoriaService.listar();
  return res.status(200).json(categorias);
};

// Buscar categoria por ID
exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  const categoria = await categoriaService.buscarPorId(id);
  if (!categoria) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  return res.status(200).json(categoria);
};

// Criar nova categoria
exports.criar = async (req, res) => {
  const dados = req.body;
  try {
    const novo = await categoriaService.criar(dados);
    return res.status(201).json(novo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Atualizar categoria
exports.atualizar = async (req, res) => {
  const dados = req.body;
  const { id } = req.params;

  const atualizado = await categoriaService.atualizar(id, dados);

  if (!atualizado) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }

  return res.status(200).json(atualizado);
};

// Deletar categoria
exports.deletar = async (req, res) => {
  const { id } = req.params;
  const deletado = await categoriaService.deletar(id);

  if (!deletado) {
    return res.status(404).json({ message: "Categoria não encontrada" });
  }
  return res.status(204).send({ message: "Categoria deletada." });
};
