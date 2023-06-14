'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Card, { foreignKey: 'cart_id' });
      this.belongsTo(models.Item, { foreignKey: 'item_id' });
    }
  }
  CartItem.init(
    {
      cart_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CartItem',
    }
  );
  return CartItem;
};
