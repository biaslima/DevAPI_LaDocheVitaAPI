const { Categoria } = require("../models");

exports.listar = async () => {
  return await Categoria.findAll();
};

exports.buscarPorId = async (id) => {
  return await Categoria.findByPk(id);
};

exports.criar = async (dados) => {
  return await Categoria.create(dados);
};

exports.atualizar = async (id, dados) => {
  const categoria = await Categoria.findByPk(id);
  if (!categoria) return null;
  await categoria.update(dados);
  return categoria;
};

exports.deletar = async (id) => {
  const categoria = await Categoria.findByPk(id);
  if (!categoria) return null;
  await categoria.destroy();
  return true;
};
