const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
require("dotenv").config();

// Middleware básico de autenticação
const autenticacao = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token de acesso requerido" });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SENHA);

    // Buscar usuário no banco para garantir que ainda existe
    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.usuario = {
      id: usuario.usuario_id,
      email: usuario.email,
      role: usuario.role,
      nome: usuario.nome,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }

    return res.status(500).json({
      message: "Erro na autenticação",
      error: error.message,
    });
  }
};

// Middleware para verificar se é admin
const verificarAdmin = async (req, res, next) => {
  try {
    await autenticacao(req, res, () => {
      if (req.usuario.role !== "admin") {
        return res.status(403).json({
          message: "Acesso negado. Apenas administradores.",
        });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro na verificação de permissão",
      error: error.message,
    });
  }
};

// Middleware para verificar se é o próprio usuário ou admin
const verificarUsuarioOuAdmin = async (req, res, next) => {
  try {
    await autenticacao(req, res, () => {
      const { id } = req.params;

      // Admin pode acessar qualquer usuário
      if (req.usuario.role === "admin") {
        return next();
      }

      // Usuário só pode acessar seus próprios dados
      if (req.usuario.id == id) {
        return next();
      }

      return res.status(403).json({
        message: "Acesso negado. Você só pode acessar seus próprios dados.",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro na verificação de permissão",
      error: error.message,
    });
  }
};

// Middleware para verificar se é cliente
const verificarCliente = async (req, res, next) => {
  try {
    await autenticacao(req, res, () => {
      if (req.usuario.role !== "cliente") {
        return res.status(403).json({
          message: "Acesso negado. Apenas para clientes.",
        });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro na verificação de permissão",
      error: error.message,
    });
  }
};

module.exports = {
  autenticacao,
  verificarAdmin,
  verificarUsuarioOuAdmin,
  verificarCliente,
  verificarClienteOuAdmin: verificarUsuarioOuAdmin,
};
