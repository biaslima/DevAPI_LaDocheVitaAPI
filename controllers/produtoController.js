const produtoService = require("../services/produtoService");

//Listar todos os produtos
exports.listar = async (req, res) => {
  const produtos = await produtoService.listar();
  res.status(201).json(produtos);
};

//Buscar por id
exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  const produto = await produtoService.buscarPorId(id);
  if (!produto) {
    return res.status(404), son({ message: "Produto não encontrado" });
  }
  res.status(200).json(produto);
};

//Criar produto
exports.criar = async (req, res) => {
  const dados = req.body;
  try {
    const novo = await produtoService.criar(dados);
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Ataulizar produto
exports.atualizar = async (req, res) => {
  const dados = req.body;
  const { id } = req.params;

  const atualizado = await produtoService.atualizar(id, dados);

  if (!atualizado) {
    res.status(404).json({ message: "Produto não encontrado" });
  }

  res.status(201).json(atualizado);
};

exports.deletar = async (req, res) => {
  const { id } = req.params;
  const deletado = await produtoService.deletar(id);

  if (!deletado) {
    res.status(404).json({ message: "Produto não encontrado" });
  }

  res.status(201).json(deletado);
};
