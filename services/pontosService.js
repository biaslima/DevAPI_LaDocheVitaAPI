const Pontos = require("../models/Pontos");
const Usuario = require("../models/Usuario");

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
    let pontos = await Pontos.findOne({
      where: { cliente_id: cliente_id },
    });

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

exports.adicionar = async (cliente_id, quantidade) => {
  try {
    const cliente = await Usuario.findOne({
      where: {
        usuario_id: cliente_id,
        role: "cliente",
      },
    });

    if (!cliente) {
      return null;
    }

    let pontos = await Pontos.findOne({
      where: { cliente_id: cliente_id },
    });

    if (!pontos) {
      pontos = await Pontos.create({
        cliente_id: cliente_id,
        saldo_pontos: quantidade,
      });
    } else {
      pontos.saldo_pontos += quantidade;
      await pontos.save();
    }

    return pontos;
  } catch (error) {
    console.error("Erro no service adicionar pontos:", error);
    throw error;
  }
};

exports.resgatar = async (cliente_id, quantidade) => {
  try {
    const cliente = await Usuario.findOne({
      where: {
        usuario_id: cliente_id,
        role: "cliente",
      },
    });

    if (!cliente) {
      return null;
    }

    const pontos = await Pontos.findOne({
      where: { cliente_id: cliente_id },
    });

    if (!pontos) {
      return null;
    }

    if (pontos.saldo_pontos < quantidade) {
      return null;
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
