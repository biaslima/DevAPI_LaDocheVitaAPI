const express = require("express");
const router = express.Router();
const pontosController = require("../controllers/pontosController");

router.get("/:cliente_id", pontosController.getPontosCliente);
router.post("/adicionar", pontosController.adicionar);
router.post("/resgatar", pontosController.resgatar);

module.exports = router;
