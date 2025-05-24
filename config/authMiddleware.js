const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
require("dotenv").config();

const autenticacao = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token de acesso requerido" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SENHA);
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

const verificarUsuarioOuAdmin = async (req, res, next) => {
  try {
    await autenticacao(req, res, () => {
      const { id } = req.params;

      if (req.usuario.role === "admin") {
        return next();
      }

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

const verificarPermissaoPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedidoService = require("../services/pedidoService");
    const pedido = await pedidoService.buscarPorId(id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    if (req.usuario.role === "admin") {
      return next();
    }

    if (req.usuario.id == pedido.cliente_id) {
      return next();
    }

    return res.status(403).json({ message: "Acesso negado." });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao verificar permissão",
      error: error.message,
    });
  }
};

const verificarPermissaoPontos = async (req, res, next) => {
  try {
    const { cliente_id } = req.params;

    if (req.usuario.role === "admin") {
      return next();
    }

    if (req.usuario.id == cliente_id) {
      return next();
    }

    return res.status(403).json({
      message: "Acesso negado. Você só pode acessar seus próprios pontos.",
    });
  } catch (error) {
    console.error("Erro ao verificar permissão:", error);
    return res.status(500).json({
      message: "Erro ao verificar permissão",
      error: error.message,
    });
  }
};

const verificarPermissaoResgate = async (req, res, next) => {
  try {
    const { cliente_id } = req.body;

    if (req.usuario.role === "admin") {
      return next();
    }

    if (req.usuario.id == cliente_id) {
      return next();
    }

    return res.status(403).json({
      message: "Acesso negado. Você só pode resgatar seus próprios pontos.",
    });
  } catch (error) {
    console.error("Erro ao verificar permissão de resgate:", error);
    return res.status(500).json({
      message: "Erro ao verificar permissão",
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
  verificarPermissaoPedido,
  verificarPermissaoPontos,
  verificarPermissaoResgate,
};
