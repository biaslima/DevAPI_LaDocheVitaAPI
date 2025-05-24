const express = require("express");
const router = express.Router();
const pontosController = require("../controllers/pontosController");
const {
  autenticacao,
  verificarAdmin,
  verificarPermissaoPontos,
  verificarPermissaoResgate,
} = require("../config/authMiddleware");

router.get(
  "/:cliente_id",
  autenticacao,
  verificarPermissaoPontos,
  pontosController.getPontosCliente
);
router.post(
  "/adicionar",
  autenticacao,
  verificarAdmin,
  pontosController.adicionar
);
router.post(
  "/resgatar",
  autenticacao,
  verificarPermissaoResgate,
  pontosController.resgatar
);

module.exports = router;
