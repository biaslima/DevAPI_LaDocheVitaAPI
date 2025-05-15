const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pontos = sequelize.define(
  "Pontos",
  {
    pontos_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saldo_pontos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "tb_pontos",
    timestamps: false,
  }
);

module.exports = Pontos;
