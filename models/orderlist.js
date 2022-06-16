'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Orderlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Orderlist.init({
    userId: DataTypes.STRING,
    item: DataTypes.STRING,
    quantity: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orderlist',
    tableName: 'Orderlists',
    underscored: true
  })
  return Orderlist
}
