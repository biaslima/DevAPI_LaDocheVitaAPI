const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const { autenticacao, verificarAdmin } = require("../config/authMiddleware");

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
    return res
      .status(500)
      .json({ message: "Erro ao verificar permissão", error: error.message });
  }
};

router.get("/", verificarAdmin, pedidoController.listar);
router.get(
  "/:id",
  autenticacao,
  verificarPermissaoPedido,
  pedidoController.buscarPorId
);
router.post("/", autenticacao, pedidoController.criar);
router.patch("/:id/status", verificarAdmin, pedidoController.atualizarStatus);
router.delete("/:id", verificarAdmin, pedidoController.deletar);

module.exports = router;
