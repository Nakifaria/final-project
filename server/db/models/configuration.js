"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsToMany(models.Item, {
        through: models.ItemsToConfiguration,
        foreignKey: "configuration_id",
      });
    }
  }
  Configuration.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Configuration",
    }
  );
  return Configuration;
};
