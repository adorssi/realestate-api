'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PropertyAmenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      property_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'properties',
            key: 'id'
          }
        },
      },
      amenitie_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'amenities',
            key: 'id'
          }
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PropertyAmenities');
  }
};