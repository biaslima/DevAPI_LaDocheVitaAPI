const sequelize = require("../config/database");
const Produto = require("./Produto");
const Categoria = require("./Categoria");
const Pedido = require("./Pedido");
const ItemPedido = require("./ItemPedido");
const Pontos = require("./Pontos");
const Usuario = require("./Usuario");

// Categoria(1) - Produtos(N)
Categoria.hasMany(Produto, { foreignKey: "categoria_id" });
Produto.belongsTo(Categoria, { foreignKey: "categoria_id" });

// Usuario como Cliente(1) - Pedidos(N)
// Agora os pedidos se relacionam diretamente com Usuario
Usuario.hasMany(Pedido, {
  foreignKey: "cliente_id",
  scope: { role: "cliente" }, // Apenas usuários com role cliente
});
Pedido.belongsTo(Usuario, {
  foreignKey: "cliente_id",
  as: "Cliente", // Alias para clareza
});

// Pedido(1) - Itens (N)
Pedido.hasMany(ItemPedido, { foreignKey: "pedido_id" });
ItemPedido.belongsTo(Pedido, { foreignKey: "pedido_id" });

// Produto(1) - Itens de Pedido(N)
Produto.hasMany(ItemPedido, { foreignKey: "produto_id" });
ItemPedido.belongsTo(Produto, { foreignKey: "produto_id" });

Usuario.hasOne(Pontos, {
  foreignKey: "cliente_id",
  as: "pontos",
});

// Um registro de pontos pertence a um usuário (cliente)
Pontos.belongsTo(Usuario, {
  foreignKey: "cliente_id",
  as: "cliente",
});

module.exports = {
  sequelize,
  Produto,
  Categoria,
  Usuario,
  Pedido,
  ItemPedido,
  Pontos,
};
