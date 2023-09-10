const { DataTypes } = require('sequelize');

// Definimos el modelo "Type"
module.exports = (sequelize) => {
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
