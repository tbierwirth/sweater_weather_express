'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
       return queryInterface.addColumn(
         'FavoriteLocations',
         'Location',
         {
          type: Sequelize.STRING,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
       )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "FavoriteLocations",
      "Location"
    );
  }
};
