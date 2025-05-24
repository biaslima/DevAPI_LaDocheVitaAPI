const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const rodadaHash = 10;

exports.listar = async () => {
  const usuarios = await Usuario.findAll({
    attributes: { exclude: ["senha"] },
    order: [["nome", "ASC"]],
  });
  return usuarios;
};

exports.listarPorRole = async (role) => {
  const usuarios = await Usuario.findAll({
    where: { role },
    attributes: { exclude: ["senha"] },
    order: [["nome", "ASC"]],
  });
  return usuarios;
};

exports.buscarPorId = async (id) => {
  const usuario = await Usuario.findByPk(id, {
    attributes: { exclude: ["senha"] },
  });
  return usuario;
};

exports.buscarPorEmail = async (email) => {
  const usuario = await Usuario.findOne({
    where: { email },
  });
  return usuario;
};

exports.criar = async (dados) => {
  const { nome, email, senha, telefone, role } = dados;

  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) {
    throw new Error("E-mail já cadastrado");
  }

  let senhaHash;
  if (senha) {
    senhaHash = await bcrypt.hash(senha, rodadaHash);
  } else {
    senhaHash = await bcrypt.hash("123456", rodadaHash);
  }

  const novoUsuario = await Usuario.create({
    nome,
    email,
    senha: senhaHash,
    telefone,
    role: role || "cliente",
  });

  // Retornar sem a senha
  const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();
  return usuarioSemSenha;
};

exports.atualizar = async (id, dados) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return null;
  }

  const { nome, email, senha, telefone, role } = dados;
  const dadosAtualizacao = { nome, email, telefone, role };

  if (senha) {
    dadosAtualizacao.senha = await bcrypt.hash(senha, rodadaHash);
  }

  if (email && email !== usuario.email) {
    const emailExistente = await Usuario.findOne({ where: { email } });
    if (emailExistente) {
      throw new Error("E-mail já cadastrado");
    }
  }

  await usuario.update(dadosAtualizacao);

  const usuarioAtualizado = await Usuario.findByPk(id, {
    attributes: { exclude: ["senha"] },
  });

  return usuarioAtualizado;
};

exports.deletar = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return false;
  }

  await usuario.destroy();
  return true;
};
