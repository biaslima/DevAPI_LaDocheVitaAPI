const pedidoService = require("../services/pedidoService");

// Lista todos os pedidos (apenas admin)
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

// Lista pedidos do cliente autenticado
exports.listarMeusPedidos = async (req, res) => {
  try {
    // Obtém o ID do cliente a partir do token de autenticação
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

// Busca um pedido específico por ID
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

// Cria um novo pedido
exports.criar = async (req, res) => {
  try {
    const { itens } = req.body;
    const cliente_id = req.usuario.id; // Pega do token de autenticação

    // Validação básica - verifica se itens foram informados
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        message: "É necessário informar pelo menos um item no pedido",
      });
    }

    // Valida estrutura dos itens
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
    // Cria o pedido no banco de dados
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

// Atualiza o status de um pedido (apenas admin)
exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Lista de status válidos para validação
    const statusValidos = [
      "Recebido",
      "Em Preparo",
      "Pronto para Retirada",
      "Finalizado",
    ];

    // Valida se o status fornecido é válido
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

// Remove um pedido do sistema (apenas admin)
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
