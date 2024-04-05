module.exports = (sequelize, DataTypes) => {
  const SupplierProduct = sequelize.define("SupplierProduct", {
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    command_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  SupplierProduct.associate = (models) => {
    const { Supplier, Command } = models;
    SupplierProduct.belongsTo(Command, { foreignKey: "command_id" });
    SupplierProduct.belongsTo(Supplier, { foreignKey: "supplier_id" });
  };
  return SupplierProduct;
};
