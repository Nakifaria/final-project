'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comparison extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Item, { foreignKey: 'item_id' });
    }
  }
  Comparison.init(
    {
      user_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comparison',
    }
  );
  return Comparison;
};
