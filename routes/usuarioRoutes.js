const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {
  verificarAdmin,
  verificarUsuarioOuAdmin,
} = require("../config/authMiddleware");

router.get("/", verificarAdmin, usuarioController.listar);
router.get("/clientes", verificarAdmin, usuarioController.listarClientes);
router.get("/:id", verificarUsuarioOuAdmin, usuarioController.buscarPorId);
router.post("/", usuarioController.criar);
router.put("/:id", verificarUsuarioOuAdmin, usuarioController.atualizar);
router.delete("/:id", verificarAdmin, usuarioController.deletar);

module.exports = router;
