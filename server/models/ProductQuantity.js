module.exports = (sequelize, DataTypes) => {
  const ProductQuantity = sequelize.define("productQuantity", {
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: DataTypes.INTEGER,
  });
  ProductQuantity.associate = (models) => {
    const { Command, Product } = models;
    ProductQuantity.belongsTo(Product, { foreignKey: "product_id" });
    Product.hasMany(ProductQuantity, { foreignKey: "product_id" });
    ProductQuantity.belongsTo(Command, { foreignKey: "command_id" });
    Command.hasMany(ProductQuantity, { foreignKey: "command_id" });
  };
  return ProductQuantity;
};
