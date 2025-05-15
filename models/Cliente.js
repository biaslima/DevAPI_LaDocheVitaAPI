const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define(
  "Cliente",
  {
    cliente_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tb_cliente",
    timestamps: false,
  }
);

module.exports = Cliente;
