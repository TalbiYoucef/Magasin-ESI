module.exports = (sequelize, DataTypes) => {
  const Product_Command = sequelize.define("Product_Command", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity :{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure it's positive or zero
        isInt: true, // Ensure it's an integer
      },
      default: 0,
    },
    delivered_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure it's positive or zero
        isInt: true, // Ensure it's an integer
      },
      default: 0,
    },
    amount_left: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure it's positive or zero
        isInt: true, // Ensure it's an integer
      },
      default: 0,
    },
  });
  Product_Command.associate = (models) => {
    const { Command, Product } = models;
    Product_Command.belongsTo(Product, { foreignKey: "product_id" });
    Product_Command.belongsTo(Command, { foreignKey: "command_id" });
  };
  return Product_Command;
};
