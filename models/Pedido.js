const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pedido = sequelize.define(
  "Pedido",
  {
    pedido_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_pedido: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM(
        "Recebido",
        "Em Preparo",
        "Pronto para Retirada",
        "Finalizado"
      ),
      defaultValue: "Recebido",
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "tb_pedido",
    timestamps: false,
  }
);

module.exports = Pedido;
