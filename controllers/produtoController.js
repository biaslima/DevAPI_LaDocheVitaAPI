const produtoService = require("../services/produtoService");

// Listar todos os produtos
exports.listar = async (req, res) => {
  try {
    const produtos = await produtoService.listar();
    return res.status(200).json(produtos);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao listar produtos", error: error.message });
  }
};

// Buscar por id
exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await produtoService.buscarPorId(id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    return res.status(200).json(produto);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar produto", error: error.message });
  }
};

// Criar produto
exports.criar = async (req, res) => {
  const dados = req.body;
  try {
    const novo = await produtoService.criar(dados);
    return res.status(201).json(novo);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar produto", error: error.message });
  }
};

// Atualizar produto
exports.atualizar = async (req, res) => {
  const dados = req.body;
  const { id } = req.params;

  try {
    const atualizado = await produtoService.atualizar(id, dados);

    if (!atualizado) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(200).json(atualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar produto", error: error.message });
  }
};

// Deletar produto
exports.deletar = async (req, res) => {
  const { id } = req.params;
  try {
    const deletado = await produtoService.deletar(id);

    if (!deletado) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao deletar produto", error: error.message });
  }
};
