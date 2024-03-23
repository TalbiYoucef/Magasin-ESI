const Chapter = require("./Chapter");

module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    branch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    chapter_id: DataTypes.INTEGER,
  });
  Branch.associate = (models) => {
    const { Chapter, Product } = models;

    Branch.belongsTo(Chapter, { foreignKey: 'chapter_id' });
    Branch.hasMany(Product, { foreignKey: 'branch_id' });
  };
  return Branch
};
