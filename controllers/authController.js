const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const rodadaHash = 10; //Número de rodadas para hash da senha

//Registra um novo usuário no sistema
exports.register = async (req, res) => {
  const { nome, email, senha, telefone, role } = req.body;

  // Verifica se já existe um usuário com o email fornecido
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    // Gera hash da senha para segurança
    const senhaHash = await bcrypt.hash(senha, rodadaHash);

    // Cria novo usuário no banco de dados
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      telefone,
      role: role || "cliente", // Define 'cliente' como default
    });

    // Remove a senha da resposta por segurança
    const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();

    // Retorna dados do usuário (sem senha)
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
};

//Faz login no sistema
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    // Verifica a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();

    // Gera token JWT
    const token = jwt.sign(
      { id: usuario.usuario_id, role: usuario.role, email: usuario.email },
      process.env.JWT_SENHA,
      { expiresIn: "1h" }
    );

    // Retorna sucesso com token e dados do usuário
    return res.json({
      message: "Login bem-sucedido",
      token,
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};
