"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemsToConfiguration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemsToConfiguration.init(
    {
      configuration_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ItemsToConfiguration",
    }
  );
  return ItemsToConfiguration;
};
