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
        Property.belongsTo(models.Currency, {
            foreignKey: 'currency_id',
            as: 'currency'
        });
        Property.belongsTo(models.City, {
            foreignKey: 'city_id',
            as: 'city'
        });
        Property.belongsTo(models.Type, {
            foreignKey: 'type_id',
            as: 'type'
        });
        Property.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
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
    mainImage: {
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
    paranoid: true,
    deletedAt: 'isDeleted',
    modelName: 'Property',
  });
  return Property;
};