const pedidoService = require("../services/pedidoService");

// GET /pedidos
exports.listar = async (req, res) => {
  const pedidos = await pedidoService.listar();
  res.json(pedidos);
};

// GET /pedidos/:id
exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  const pedido = await pedidoService.buscarPorId(id);
  if (!pedido) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }
  res.json(pedido);
};

// POST /pedidos
exports.criar = async (req, res) => {
  const { cliente_id, status, valor_total, itens } = req.body;
  try {
    const novoPedido = await pedidoService.criar(
      { cliente_id, status, valor_total },
      itens
    );
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /pedidos/:id/status
exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const atualizado = await pedidoService.atualizarStatus(id, status);
  if (!atualizado) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }
  res.json(atualizado);
};

// DELETE /pedidos/:id
exports.deletar = async (req, res) => {
  const { id } = req.params;
  const removido = await pedidoService.deletar(id);
  if (!removido) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }
  res.status(204).json({ message: "Pedido deletado" });
};
