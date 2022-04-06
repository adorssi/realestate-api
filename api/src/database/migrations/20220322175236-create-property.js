'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ref: {
        type: Sequelize.STRING
      },
      currency_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'currencies',
            key: 'id'
          }
        },
        //onUpdate: 'cascade',
        //onDelete: 'cascade'
      },
      price: {
          type: Sequelize.DECIMAL(10,2),
      },
      financing: {
          type: Sequelize.BOOLEAN,
      },
      address: {
          type: Sequelize.STRING,
      },
      operationType: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      landSize: {
          type: Sequelize.INTEGER,
      },
      builtSize: {
          type: Sequelize.INTEGER,
      },
      bedrooms: {
          type: Sequelize.INTEGER,
      },
      toilets: {
          type: Sequelize.INTEGER,
      },
      garage: {
          type: Sequelize.INTEGER,
      },
      description: {
          type: Sequelize.STRING(450),
          allowNull: false,
      },
      mainImage: {
          type: Sequelize.STRING,
      },
      published: {
          type: Sequelize.BOOLEAN,
      },
      featured: {
          type: Sequelize.BOOLEAN,
      },
      showPrice: {
          type: Sequelize.BOOLEAN,
      },
      gallery: {
          type: Sequelize.STRING,
      },
      city_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'cities',
            key: 'id'
        },
        //onUpdate: 'cascade',
        //onDelete: 'cascade'
        }
      },
      type_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'types',
            key: 'id'
          },
          //onUpdate: 'cascade',
          //onDelete: 'cascade'
        }
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            key: 'id'
          },
          //onUpdate: 'cascade',
          //onDelete: 'cascade'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isDeleted: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Properties');
  }
};