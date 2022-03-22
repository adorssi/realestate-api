'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Property.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ref: {
        type: DataTypes.STRING,
    },
    currency_id: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
    },
    financing: {
        type: DataTypes.BOOLEAN,
    },
    address: {
        type: DataTypes.STRING,
    },
    operationType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    landSize: {
        type: DataTypes.INTEGER,
    },
    builtSize: {
        type: DataTypes.INTEGER,
    },
    bedrooms: {
        type: DataTypes.INTEGER,
    },
    toilets: {
        type: DataTypes.INTEGER,
    },
    garage: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING(450),
        allowNull: false,
    },
    images: {
        type: DataTypes.STRING,
    },
    published: {
        type: DataTypes.BOOLEAN,
    },
    featured: {
        type: DataTypes.BOOLEAN,
    },
    showPrice: {
        type: DataTypes.BOOLEAN,
    },
    gallery: {
        type: DataTypes.STRING,
    },
    city_id: {
        type: DataTypes.INTEGER,
    },
    type_id: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};