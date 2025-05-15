const { Pontos } = require("../models");

exports.getPontosCliente = async (cliente_id) => {
  return await Pontos.findOne({ where: { cliente_id } });
};

exports.adicionar = async (cliente_id, quantidade) => {
  const registro = await Pontos.findOne({ where: { cliente_id } });
  if (!registro) return null;
  registro.saldo_pontos += quantidade;
  await registro.save();
  return registro;
};

exports.resgatar = async (cliente_id, quantidade) => {
  const registro = await Pontos.findOne({ where: { cliente_id } });
  if (!registro || registro.saldo_pontos < quantidade) return null;
  registro.saldo_pontos -= quantidade;
  await registro.save();
  return registro;
};
