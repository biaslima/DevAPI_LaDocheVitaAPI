const pedidoService = require("../services/pedidoService");

// GET /pedidos
exports.listar = async (req, res) => {
  try {
    const pedidos = await pedidoService.listar();
    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar pedidos",
      error: error.message,
    });
  }
};

// GET /pedidos/meus-pedidos
exports.listarMeusPedidos = async (req, res) => {
  try {
    const cliente_id = req.usuario.id;
    const pedidos = await pedidoService.listarPorCliente(cliente_id);
    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao listar pedidos",
      error: error.message,
    });
  }
};

// GET /pedidos/:id
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.buscarPorId(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }
    return res.json(pedido);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar pedido",
      error: error.message,
    });
  }
};

// POST /pedidos
exports.criar = async (req, res) => {
  try {
    const { itens } = req.body;
    const cliente_id = req.usuario.id; // Pega do token de autenticação

    // Validação básica
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        message: "É necessário informar pelo menos um item no pedido",
      });
    }

    // Validar estrutura dos itens
    for (const item of itens) {
      if (!item.produto_id || !item.quantidade) {
        return res.status(400).json({
          message: "Cada item deve conter produto_id e quantidade",
        });
      }

      if (item.quantidade <= 0) {
        return res.status(400).json({
          message: "A quantidade deve ser maior que zero",
        });
      }
    }

    const novoPedido = await pedidoService.criar(
      {
        cliente_id,
        status: "Recebido", // Status padrão
      },
      itens
    );

    return res.status(201).json({
      message: "Pedido criado com sucesso!",
      pedido: novoPedido,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Erro ao criar pedido",
      error: error.message,
    });
  }
};

// PATCH /pedidos/:id/status
exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validar status
    const statusValidos = [
      "Recebido",
      "Em Preparo",
      "Pronto para Retirada",
      "Finalizado",
    ];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({
        message: "Status inválido",
        statusValidos: statusValidos,
      });
    }

    const atualizado = await pedidoService.atualizarStatus(id, status);
    if (!atualizado) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.json({
      message: "Status atualizado com sucesso!",
      pedido: atualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar status do pedido",
      error: error.message,
    });
  }
};

// DELETE /pedidos/:id
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const removido = await pedidoService.deletar(id);
    if (!removido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar pedido",
      error: error.message,
    });
  }
};
