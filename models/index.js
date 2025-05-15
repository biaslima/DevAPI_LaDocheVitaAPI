const sequelize = require("../config/database");
const Produto = require("./Produto");
const Categoria = require("./Categoria");
const Cliente = require("./Cliente");
const Pedido = require("./Pedido");
const ItemPedido = require("./ItemPedido");
const Pontos = require("./Pontos");
const Usuario = require("./Usuario");

// Categoria(1) - Produtos(N)
Categoria.hasMany(Produto, { foreignKey: "categoria_id" });
Produto.belongsTo(Categoria, { foreignKey: "categoria_id" });

// Cliente(1) - Pedidos(N)
Cliente.hasMany(Pedido, { foreignKey: "cliente_id" });
Pedido.belongsTo(Cliente, { foreignKey: "cliente_id" });

// Pedido(1) - Itens (N)
Pedido.hasMany(ItemPedido, { foreignKey: "pedido_id" });
ItemPedido.belongsTo(Pedido, { foreignKey: "pedido_id" });

// Produto(1) - Itens de Pedido(N)
Produto.hasMany(ItemPedido, { foreignKey: "produto_id" });
ItemPedido.belongsTo(Produto, { foreignKey: "produto_id" });

// Cliente(1) - Saldo de Pontos(1)
Cliente.hasOne(Pontos, { foreignKey: "cliente_id" });
Pontos.belongsTo(Cliente, { foreignKey: "cliente_id" });

module.exports = {
  sequelize,
  Produto,
  Categoria,
  Cliente,
  Pedido,
  ItemPedido,
  Pontos,
  Usuario,
};
