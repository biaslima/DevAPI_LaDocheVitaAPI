const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const { verificarAdmin } = require("../config/authMiddleware");

router.get("/", categoriaController.listar);
router.get("/:id", categoriaController.buscarPorId);
router.post("/", verificarAdmin, categoriaController.criar);
router.put("/:id", verificarAdmin, categoriaController.atualizar);
router.delete("/:id", verificarAdmin, categoriaController.deletar);

module.exports = router;
