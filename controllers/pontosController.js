const pontosService = require("../services/pontosService");

exports.getPontosCliente = async (req, res) => {
  const { cliente_id } = req.params;
  const pontos = await pontosService.getPontosCliente(cliente_id);
  if (!pontos) {
    return res.status(404).json({ message: "Registro não encontrado" });
  }
  res.json(pontos);
};

exports.adicionar = async (req, res) => {
  const { cliente_id, quantidade } = req.body;
  const atualizado = await pontosService.adicionar(cliente_id, quantidade);
  if (!atualizado) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }
  res.json(atualizado);
};

exports.resgatar = async (req, res) => {
  const { cliente_id, quantidade } = req.body;
  const atualizado = await pontosService.resgatar(cliente_id, quantidade);
  if (!atualizado) {
    return res
      .status(400)
      .json({ message: "Saldo insuficiente ou cliente inválido" });
  }
  res.json(atualizado);
};
