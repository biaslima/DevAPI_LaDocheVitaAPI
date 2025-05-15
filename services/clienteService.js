const { Cliente } = require("../models");

exports.listar = async () => {
  return await Cliente.findAll();
};

exports.buscarPorId = async (id) => {
  return await Cliente.findByPk(id);
};

exports.criar = async (dados) => {
  return await Cliente.create(dados);
};

exports.atualizar = async (id, dados) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return null;
  await cliente.update(dados);
  return cliente;
};

exports.deletar = async (id) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return null;
  await cliente.destroy();
  return true;
};
