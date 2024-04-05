module.exports = (sequelize, DataTypes) => {
  const PurchasingOrder = sequelize.define("PurchasingOrder", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "shipped", "canceled"),
      allowNull: false,
      defaultValue: "pending",
    },
    expected_delivery_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  PurchasingOrder.associate = (models) => {
    const { Supplier, ReceiptNote, Command } = models;
    Supplier.hasMany(PurchasingOrder, { foreignKey: "supplier_id" });
    PurchasingOrder.hasMany(Supplier, { foreignKey: "supplier_id" });
    PurchasingOrder.belongsTo(Command, { foreignKey: "command_id" });
    Command.hasOne(PurchasingOrder, { foreignKey: "command_id" });
    PurchasingOrder.hasMany(ReceiptNote, { foreignKey: "order_id" });
    ReceiptNote.belongsTo(PurchasingOrder, { foreignKey: "order_id" });
  };
  return PurchasingOrder;
};
