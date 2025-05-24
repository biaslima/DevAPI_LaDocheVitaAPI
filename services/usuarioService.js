const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const rodadaHash = 10;

// Listar todos os usuários (sem senha)
exports.listar = async () => {
  const usuarios = await Usuario.findAll({
    attributes: { exclude: ["senha"] },
    order: [["nome", "ASC"]],
  });
  return usuarios;
};

// Listar usuários por role (sem senha)
exports.listarPorRole = async (role) => {
  const usuarios = await Usuario.findAll({
    where: { role },
    attributes: { exclude: ["senha"] },
    order: [["nome", "ASC"]],
  });
  return usuarios;
};

// Buscar usuário por ID (sem senha)
exports.buscarPorId = async (id) => {
  const usuario = await Usuario.findByPk(id, {
    attributes: { exclude: ["senha"] },
  });
  return usuario;
};

// Buscar usuário por email (com senha - para autenticação)
exports.buscarPorEmail = async (email) => {
  const usuario = await Usuario.findOne({
    where: { email },
  });
  return usuario;
};

// Criar novo usuário
exports.criar = async (dados) => {
  const { nome, email, senha, telefone, role } = dados;

  // Verificar se email já existe
  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) {
    throw new Error("E-mail já cadastrado");
  }

  // Hash da senha se fornecida
  let senhaHash;
  if (senha) {
    senhaHash = await bcrypt.hash(senha, rodadaHash);
  } else {
    // Senha padrão para clientes criados sem senha
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

// Atualizar usuário
exports.atualizar = async (id, dados) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return null;
  }

  const { nome, email, senha, telefone, role } = dados;
  const dadosAtualizacao = { nome, email, telefone, role };

  // Se uma nova senha foi fornecida, fazer hash
  if (senha) {
    dadosAtualizacao.senha = await bcrypt.hash(senha, rodadaHash);
  }

  // Verificar se o novo email já existe (se diferente do atual)
  if (email && email !== usuario.email) {
    const emailExistente = await Usuario.findOne({ where: { email } });
    if (emailExistente) {
      throw new Error("E-mail já cadastrado");
    }
  }

  await usuario.update(dadosAtualizacao);

  // Buscar o usuário atualizado sem a senha
  const usuarioAtualizado = await Usuario.findByPk(id, {
    attributes: { exclude: ["senha"] },
  });

  return usuarioAtualizado;
};

// Deletar usuário
exports.deletar = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return false;
  }

  await usuario.destroy();
  return true;
};
