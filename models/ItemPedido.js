const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ItemPedido = sequelize.define(
  "ItemPedido",
  {
    item_pedido_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "tb_item_pedido",
    timestamps: false,
  }
);

module.exports = ItemPedido;
