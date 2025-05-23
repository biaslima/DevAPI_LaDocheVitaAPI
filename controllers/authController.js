const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const rodadaHash = 10;

exports.register = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      res.status(409).json({ message: "E-mail já cadastrado" });
    }
    const senhaHash = await bcrypt.hash(senha, rodadaHash);
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      role: role || "cliente",
    });

    const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();

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

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.usuario_id, role: usuario.role, email: usuario.email },
      process.env.JWT_SENHA,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login bem-sucedido", token, usuarioSemSenha });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao fazer login", error });
  }
};
