const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");
const { verificarAdmin } = require("../config/authMiddleware");

router.get("/", produtoController.listar);
router.get("/:id", produtoController.buscarPorId);
router.post("/", verificarAdmin, produtoController.criar);
router.put("/:id", verificarAdmin, produtoController.atualizar);
router.delete("/:id", verificarAdmin, produtoController.deletar);

module.exports = router;
