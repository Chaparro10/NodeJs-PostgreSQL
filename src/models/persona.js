
const { DataTypes } = require('sequelize');
const sequelize = require('../bd.js');
const Persona = sequelize.define('persona', {
    idpersona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
  telefono: {
    type: DataTypes.CHAR, 
    allowNull: false
  }
}, {
  timestamps: false,//Desabilita los campos de tiempo
  tableName: 'persona' 
});

module.exports = Persona;