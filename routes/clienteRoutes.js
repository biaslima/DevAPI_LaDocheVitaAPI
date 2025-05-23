const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const {
  verificarAdmin,
  verificarClienteOuAdmin,
} = require("../config/authMiddleware");

router.get("/", verificarAdmin, clienteController.listar);
router.get("/:id", verificarClienteOuAdmin, clienteController.buscarPorId);
router.post("/", clienteController.criar);
router.put("/:id", verificarClienteOuAdmin, clienteController.atualizar);
router.delete("/:id", verificarAdmin, clienteController.deletar);

module.exports = router;
