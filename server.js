require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(cors());

// Importação das rotas
const authRoutes = require("./routes/authRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const pontosRoutes = require("./routes/pontosRoutes");

// Definição das rotas
app.use("/auth", authRoutes);
app.use("/produtos", produtoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/pontos", pontosRoutes);

// Rota de erro 404
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Manipulador de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "production" ? {} : err.message,
  });
});

// Sincronização com o banco de dados
db.sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar banco de dados:", err);
  });

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
