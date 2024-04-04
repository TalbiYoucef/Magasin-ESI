module.exports = (sequelize, DataTypes) => {
  const PurchasingOrder = sequelize.define("PurchasingOrder", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
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
    total_price: {
      type: DataTypes.INTEGER,
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
    const { ReceiptNote, Command } = models;

    PurchasingOrder.belongsTo(Command, { foreignKey: "command_id" });
    Command.hasOne(PurchasingOrder, { foreignKey: "command_id" });
    PurchasingOrder.hasMany(ReceiptNote, { foreignKey: "order_id" });
    ReceiptNote.belongsTo(PurchasingOrder, { foreignKey: "order_id" });
  };
  return PurchasingOrder;
};
