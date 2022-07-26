const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    healthScore:{
      type: DataTypes.FLOAT,
      allowNull: true
    },
    steps:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    img:{
      type : DataTypes.STRING,
      allowNull: true
    }
  });
};
