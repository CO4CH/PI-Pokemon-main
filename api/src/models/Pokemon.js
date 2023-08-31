const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const { v4: uuidv4 } = require('uuid'); // Importar la función uuidv4
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.UUID, // Utilizar UUID como tipo de dato
      defaultValue: () => uuidv4(), // Generar un UUID por defecto
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Ataque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Velocidad: {
      type: DataTypes.INTEGER,
    },
    Altura: {
      type: DataTypes.FLOAT,
    },
    Peso: {
      type: DataTypes.FLOAT,
    },
  });
};
