module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,

  });
  Product.associate = (models) => {
    const { Product_Command } = models;
    Product.hasMany(Product_Command, { foreignKey: "product_id" });
  };
  return Product;
};
