const pontosService = require("../services/pontosService");

exports.getPontosCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;

    // Validar se cliente_id é um número válido
    if (!cliente_id || isNaN(cliente_id)) {
      return res.status(400).json({ message: "ID do cliente inválido" });
    }

    const pontos = await pontosService.getPontosCliente(cliente_id);

    if (!pontos) {
      return res
        .status(404)
        .json({ message: "Registro de pontos não encontrado" });
    }

    res.status(200).json(pontos);
  } catch (error) {
    console.error("Erro ao buscar pontos do cliente:", error);
    return res.status(500).json({
      message: "Erro ao buscar pontos do cliente",
      error: error.message,
    });
  }
};

exports.adicionar = async (req, res) => {
  try {
    const { cliente_id, quantidade } = req.body;

    // Validações
    if (!cliente_id || isNaN(cliente_id)) {
      return res
        .status(400)
        .json({ message: "ID do cliente é obrigatório e deve ser um número" });
    }

    if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
      return res
        .status(400)
        .json({ message: "Quantidade deve ser um número positivo" });
    }

    const atualizado = await pontosService.adicionar(cliente_id, quantidade);

    if (!atualizado) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    res.status(200).json({
      message: "Pontos adicionados com sucesso",
      data: atualizado,
    });
  } catch (error) {
    console.error("Erro ao adicionar pontos:", error);
    return res.status(500).json({
      message: "Erro ao adicionar pontos",
      error: error.message,
    });
  }
};

exports.resgatar = async (req, res) => {
  try {
    const { cliente_id, quantidade } = req.body;

    // Validações
    if (!cliente_id || isNaN(cliente_id)) {
      return res
        .status(400)
        .json({ message: "ID do cliente é obrigatório e deve ser um número" });
    }

    if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
      return res
        .status(400)
        .json({ message: "Quantidade deve ser um número positivo" });
    }

    const atualizado = await pontosService.resgatar(cliente_id, quantidade);

    if (!atualizado) {
      return res.status(400).json({
        message: "Saldo insuficiente ou cliente inválido",
      });
    }

    res.status(200).json({
      message: "Pontos resgatados com sucesso",
      data: atualizado,
    });
  } catch (error) {
    console.error("Erro ao resgatar pontos:", error);
    return res.status(500).json({
      message: "Erro ao resgatar pontos",
      error: error.message,
    });
  }
};
