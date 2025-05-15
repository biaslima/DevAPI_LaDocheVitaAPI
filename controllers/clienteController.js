const clienteService = require("../services/clienteService");

//Listar todos os produtos
exports.listar = async (req, res) => {
  const clientes = await clienteService.listar();
  res.status(200).json(clientes);
};

//Buscar por id
exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  const cliente = await clienteService.buscarPorId(id);
  if (!cliente) {
    return res.status(404), son({ message: "Cliete não encontrado" });
  }
  res.status(200).json(cliente);
};

//Criar produto
exports.criar = async (req, res) => {
  const dados = req.body;
  try {
    const novo = await clienteService.criar(dados);
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Ataulizar produto
exports.atualizar = async (req, res) => {
  const dados = req.body;
  const { id } = req.params;

  const atualizado = await clienteService.atualizar(id, dados);

  if (!atualizado) {
    res.status(404).json({ message: "Cliente não encontrado" });
  }

  res.status(201).json(atualizado);
};

exports.deletar = async (req, res) => {
  const { id } = req.params;
  const deletado = await clienteService.deletar(id);

  if (!deletado) {
    res.status(404).json({ message: "Cliente não encontrado" });
  }

  res.status(201).json(deletado);
};
