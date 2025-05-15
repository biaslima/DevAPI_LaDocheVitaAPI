const { Produto } = require("../models");

exports.listar = async () => {
  return await Produto.findAll();
};

exports.buscarPorId = async (id) => {
  return await Produto.findByPk(id);
};

exports.criar = async (dados) => {
  return await Produto.create(dados);
};

exports.atualizar = async (id, dados) => {
  const produto = await Produto.findByPk(id);
  if (!produto) return null;
  await produto.update(dados);
  return produto;
};

exports.deletar = async (id) => {
  const produto = await Produto.findByPk(id);
  if (!produto) return null;
  await produto.destroy();
  return true;
};
