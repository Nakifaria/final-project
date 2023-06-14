'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
      this.hasMany(models.CartItem, { foreignKey: 'item_id' });
    }
  }
  Item.init(
    {
      category_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      img: DataTypes.STRING,
      description: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
