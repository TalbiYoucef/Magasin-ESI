module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    branch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    chapter_id: DataTypes.INTEGER,
    VAT : {
      type: DataTypes.DECIMAL(5, 2), // VAT as a percentage with 2 decimal places
      allowNull: true, // Adjust as needed
      validate: {
        min: 0,
        max: 100,
      },
    },
  });
  Branch.associate = (models) => {
    const { Chapter, Product } = models;
    Branch.belongsTo(Chapter, { foreignKey: 'chapter_id' });
    Branch.hasMany(Product, { foreignKey: 'branch_id' });
  };
  return Branch
};
