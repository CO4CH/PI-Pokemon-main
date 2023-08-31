const { DataTypes } = require('sequelize');

// Definimos el modelo "Type"
module.exports = (sequelize) => {
  sequelize.define('type', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
