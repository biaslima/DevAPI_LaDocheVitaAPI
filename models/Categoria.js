const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categoria = sequelize.define(
  "Categoria",
  {
    categoria_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "tb_categoria",
    timestamps: false,
  }
);

module.exports = Categoria;
