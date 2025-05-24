const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidoController");
const {
  autenticacao,
  verificarAdmin,
  verificarPermissaoPedido,
} = require("../config/authMiddleware");

router.get("/", verificarAdmin, pedidoController.listar);
router.get("/meus-pedidos", autenticacao, pedidoController.listarMeusPedidos);
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
