const { Pedido, ItemPedido, Produto } = require("../models");

// Listar todos os pedidos (com itens)
exports.listar = async () => {
  return await Pedido.findAll({ include: ItemPedido });
};

// Listar pedidos por cliente_id (com itens)
exports.listarPorCliente = async (cliente_id) => {
  return await Pedido.findAll({
    where: { cliente_id },
    include: ItemPedido,
    order: [["data_pedido", "DESC"]],
  });
};

// Buscar por ID (com itens)
exports.buscarPorId = async (id) => {
  return await Pedido.findByPk(id, { include: ItemPedido });
};

// Criar pedido e seus itens
exports.criar = async (pedidoData, itens) => {
  const pedido = await Pedido.create(pedidoData);

  for (const item of itens) {
    await ItemPedido.create({
      pedido_id: pedido.pedido_id,
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      valor_unitario: item.valor_unitario,
    });

    // Atualizar o estoque do produto
    const produto = await Produto.findByPk(item.produto_id);
    if (produto) {
      produto.estoque -= item.quantidade;
      await produto.save();
    }
  }
  return pedido;
};

// Atualizar status do pedido
exports.atualizarStatus = async (id, novoStatus) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) return null;
  await pedido.update({ status: novoStatus });
  return pedido;
};

// Deletar pedido (e opcionalmente os itens)
exports.deletar = async (id) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) return false;
  await pedido.destroy(pedido);
  return true;
};
