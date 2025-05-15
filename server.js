require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./config/database");
const db = require("./models");

app.use(express.json());

const produtoRoutes = require("./routes/produtoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const pontosRoutes = require("./routes/pontosRoutes");

app.use("/produtos", produtoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/pontos", pontosRoutes);

db.sequelize.sync().then(() => {
  console.log("Tabelas sincronizadas");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
