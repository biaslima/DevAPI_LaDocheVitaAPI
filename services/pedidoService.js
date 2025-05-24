const { Pedido, ItemPedido, Produto } = require("../models");

exports.listar = async () => {
  return await Pedido.findAll({
    include: [
      {
        model: ItemPedido,
        include: [
          {
            model: Produto,
            attributes: ["nome", "descricao"],
          },
        ],
      },
    ],
  });
};

exports.listarPorCliente = async (cliente_id) => {
  return await Pedido.findAll({
    where: { cliente_id },
    include: [
      {
        model: ItemPedido,
        include: [
          {
            model: Produto,
            attributes: ["nome", "descricao"],
          },
        ],
      },
    ],
    order: [["data_pedido", "DESC"]],
  });
};

exports.buscarPorId = async (id) => {
  return await Pedido.findByPk(id, {
    include: [
      {
        model: ItemPedido,
        include: [
          {
            model: Produto,
            attributes: ["nome", "descricao"],
          },
        ],
      },
    ],
  });
};

exports.criar = async (pedidoData, itens) => {
  let valorTotalCalculado = 0;
  const itensValidados = [];

  for (const item of itens) {
    const produto = await Produto.findByPk(item.produto_id);

    if (!produto) {
      throw new Error(`Produto com ID ${item.produto_id} não encontrado`);
    }

    if (!produto.status) {
      throw new Error(`Produto "${produto.nome}" não está disponível`);
    }

    if (produto.estoque < item.quantidade) {
      throw new Error(
        `Estoque insuficiente para o produto "${produto.nome}". Disponível: ${produto.estoque}, Solicitado: ${item.quantidade}`
      );
    }

    const valorItem = produto.preco_unitario * item.quantidade;
    valorTotalCalculado += parseFloat(valorItem);

    itensValidados.push({
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      valor_unitario: produto.preco_unitario, // Pega o preço do produto
      produto: produto, // Guardar referência para atualizar estoque
    });
  }

  const pedido = await Pedido.create({
    ...pedidoData,
    valor_total: valorTotalCalculado.toFixed(2),
  });

  for (const item of itensValidados) {
    await ItemPedido.create({
      pedido_id: pedido.pedido_id,
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      valor_unitario: item.valor_unitario,
    });

    item.produto.estoque -= item.quantidade;
    await item.produto.save();
  }

  return pedido;
};

exports.atualizarStatus = async (id, novoStatus) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) return null;
  await pedido.update({ status: novoStatus });
  return pedido;
};

exports.deletar = async (id) => {
  const pedido = await Pedido.findByPk(id);
  if (!pedido) return false;
  await pedido.destroy();
  return true;
};
