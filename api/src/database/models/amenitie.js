'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenitie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Amenitie.belongsToMany(models.Property, {
        as: 'properties',
        through: 'PropertyAmenitie',
        foreignKey: 'amenitie_id',
        otherKey: 'property_id'
    })
    }
  };
  Amenitie.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Amenitie',
  });
  return Amenitie;
};