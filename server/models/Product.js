module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    qt_logique: DataTypes.INTEGER,
    qt_physique: DataTypes.INTEGER,
    branch_id: DataTypes.INTEGER,
  });
  Product.associate = (models) => {
    const { Branch, Product_Command } = models;
    Product.belongsTo(Branch, { foreignKey: "branch_id" });
    Product.hasMany(Product_Command, { foreignKey: "product_id" });
  };
  return Product;
};
