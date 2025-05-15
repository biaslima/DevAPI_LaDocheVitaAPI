const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Produto = sequelize.define(
  "Produto",
  {
    produto_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    estoque: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    preco_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "tb_produto",
    timestamps: false,
  }
);

module.exports = Produto;
