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
    Command.hasMany(SupplierProduct, { foreignKey: "command_id" });
    SupplierProduct.belongsTo(Supplier, { foreignKey: "supplier_id" });
    Supplier.hasMany(SupplierProduct, { foreignKey: "Supplier_id" });
  };
  return SupplierProduct;
};
