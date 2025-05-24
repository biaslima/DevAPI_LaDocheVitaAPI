const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { autenticacao } = require("../config/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", autenticacao, (req, res) => {
  res.json({
    message: "Token válido",
    usuario: {
      id: req.usuario.id,
      email: req.usuario.email,
      role: req.usuario.role,
      nome: req.usuario.nome,
    },
  });
});

module.exports = router;
