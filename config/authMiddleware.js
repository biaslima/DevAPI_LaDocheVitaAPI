const jwt = require("jsonwebtoken");
require("dotenv").config();

const autenticacao = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

const verificarAdmin = (req, res, next) => {
  autenticacao(req, res, () => {
    if (req.usuario.role !== "admin") {
      return res.status(403).json({
        message:
          "Acesso negado. Apenas administradores podem acessar esta rota.",
      });
    }
    next();
  });
};

const verificarClienteOuAdmin = (req, res, next) => {
  autenticacao(req, res, () => {
    const { id } = req.params;
    const usuarioId = req.usuario.id;
    const role = req.usuario.role;

    if (role === "admin") {
      return next();
    }

    if (usuarioId == id) {
      return next();
    }

    return res.status(403).json({ message: "Acesso negado." });
  });
};

module.exports = {
  autenticacao,
  verificarAdmin,
  verificarClienteOuAdmin,
};
