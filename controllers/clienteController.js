const clienteService = require("../services/clienteService");

exports.listar = async (req, res) => {
  try {
    const clientes = await clienteService.listar();
    return res.status(200).json(clientes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao listar clientes", error: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await clienteService.buscarPorId(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    return res.status(200).json(cliente);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar cliente", error: error.message });
  }
};

exports.criar = async (req, res) => {
  const dados = req.body;
  try {
    const novo = await clienteService.criar(dados);
    return res.status(201).json(novo);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar cliente", error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  const dados = req.body;
  const { id } = req.params;

  try {
    const atualizado = await clienteService.atualizar(id, dados);

    if (!atualizado) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json(atualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar cliente", error: error.message });
  }
};

exports.deletar = async (req, res) => {
  const { id } = req.params;
  try {
    const deletado = await clienteService.deletar(id);

    if (!deletado) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao deletar cliente", error: error.message });
  }
};
