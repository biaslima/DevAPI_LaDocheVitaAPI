const Pontos = require("../models/Pontos");
const Usuario = require("../models/Usuario");

// Buscar pontos de um cliente
exports.getPontosCliente = async (cliente_id) => {
  try {
    // Primeiro, verificar se o cliente existe
    const cliente = await Usuario.findOne({
      where: {
        usuario_id: cliente_id,
        role: "cliente",
      },
    });

    if (!cliente) {
      return null;
    }

    // Buscar ou criar registro de pontos
    let pontos = await Pontos.findOne({
      where: { cliente_id: cliente_id },
    });

    // Se não existir registro de pontos, criar um novo
    if (!pontos) {
      pontos = await Pontos.create({
        cliente_id: cliente_id,
        saldo_pontos: 0,
      });
    }

    return pontos;
  } catch (error) {
    console.error("Erro no service getPontosCliente:", error);
    throw error;
  }
};

// Adicionar pontos a um cliente
exports.adicionar = async (cliente_id, quantidade) => {
  try {
    // Verificar se o cliente existe
    const cliente = await Usuario.findOne({
      where: {
        usuario_id: cliente_id,
        role: "cliente",
      },
    });

    if (!cliente) {
      return null;
    }

    // Buscar ou criar registro de pontos
    let pontos = await Pontos.findOne({
      where: { cliente_id: cliente_id },
    });

    if (!pontos) {
      // Criar novo registro
      pontos = await Pontos.create({
        cliente_id: cliente_id,
        saldo_pontos: quantidade,
      });
    } else {
      // Atualizar saldo existente
      pontos.saldo_pontos += quantidade;
      await pontos.save();
    }

    return pontos;
  } catch (error) {
    console.error("Erro no service adicionar pontos:", error);
    throw error;
  }
};

// Resgatar pontos de um cliente
exports.resgatar = async (cliente_id, quantidade) => {
  try {
    // Verificar se o cliente existe
    const cliente = await Usuario.findOne({
      where: {
        usuario_id: cliente_id,
        role: "cliente",
      },
    });

    if (!cliente) {
      return null;
    }

    // Buscar registro de pontos
    const pontos = await Pontos.findOne({
      where: { cliente_id: cliente_id },
    });

    if (!pontos) {
      return null; // Cliente não tem pontos
    }

    // Verificar se tem saldo suficiente
    if (pontos.saldo_pontos < quantidade) {
      return null; // Saldo insuficiente
    }

    // Subtrair pontos
    pontos.saldo_pontos -= quantidade;
    await pontos.save();

    return pontos;
  } catch (error) {
    console.error("Erro no service resgatar pontos:", error);
    throw error;
  }
};

// Listar todos os registros de pontos (para admin)
exports.listarTodos = async () => {
  try {
    const pontos = await Pontos.findAll({
      include: [
        {
          model: Usuario,
          as: "cliente",
          attributes: ["usuario_id", "nome", "email"],
        },
      ],
    });
    return pontos;
  } catch (error) {
    console.error("Erro no service listarTodos pontos:", error);
    throw error;
  }
};
