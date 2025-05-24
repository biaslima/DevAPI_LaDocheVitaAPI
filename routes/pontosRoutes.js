const express = require("express");
const router = express.Router();
const pontosController = require("../controllers/pontosController");
const { autenticacao, verificarAdmin } = require("../config/authMiddleware");

// Middleware para verificar se pode acessar pontos do cliente
const verificarPermissaoPontos = async (req, res, next) => {
  try {
    const { cliente_id } = req.params;

    // Admin pode acessar pontos de qualquer cliente
    if (req.usuario.role === "admin") {
      return next();
    }

    // Cliente só pode acessar seus próprios pontos
    // Corrigido: usar req.usuario.id em vez de req.usuario.usuario_id
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

// Middleware para verificar se pode resgatar pontos
const verificarPermissaoResgate = async (req, res, next) => {
  try {
    const { cliente_id } = req.body;

    // Admin pode resgatar pontos de qualquer cliente
    if (req.usuario.role === "admin") {
      return next();
    }

    // Cliente só pode resgatar seus próprios pontos
    // Corrigido: usar req.usuario.id em vez de req.usuario.usuario_id
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

// GET /pontos/:cliente_id - Buscar pontos de um cliente
router.get(
  "/:cliente_id",
  autenticacao,
  verificarPermissaoPontos,
  pontosController.getPontosCliente
);

// POST /pontos/adicionar - Adicionar pontos (apenas admin)
router.post(
  "/adicionar",
  autenticacao,
  verificarAdmin,
  pontosController.adicionar
);

// POST /pontos/resgatar - Resgatar pontos
router.post(
  "/resgatar",
  autenticacao,
  verificarPermissaoResgate,
  pontosController.resgatar
);

module.exports = router;
