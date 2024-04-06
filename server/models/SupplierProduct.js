module.exports = (sequelize, DataTypes) => {
  const SupplierProduct = sequelize.define("SupplierProduct", {
    id: {
      type : DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  SupplierProduct.associate = (models) => {
    const { Supplier, Product } = models;
    SupplierProduct.belongsTo(Product, { foreignKey: "product_id" });
    Product.hasMany(SupplierProduct, { foreignKey: "product_id" });
    SupplierProduct.belongsTo(Supplier, { foreignKey: "supplier_id" });
    Supplier.hasMany(SupplierProduct, { foreignKey: "Supplier_id" });
  };
  return SupplierProduct;
};
