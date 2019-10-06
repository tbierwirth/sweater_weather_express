'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteLocation = sequelize.define('FavoriteLocation', {
    locationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  FavoriteLocation.associate = function(models) {
    FavoriteLocation.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  };
  return FavoriteLocation;
};
