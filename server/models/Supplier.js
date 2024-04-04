module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define("Supplier", {
    supplier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Supplier.associate = (models) => {
    const { SupplierProduct } = models;
    Supplier.hasMany(SupplierProduct, { foreignKey: "id_supplier" });
    SupplierProduct.belongsTo(Supplier, { foreignKey: "id_supplier" });
  };
  return Supplier;
};

