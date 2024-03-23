module.exports = (sequelize, DataTypes)=> {
  const  User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    address: DataTypes.STRING,
    phone_num: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'enabled', 'disabled'),
      defaultValue: 'active'
    },
    password: DataTypes.STRING,
    token: {
      type: DataTypes.STRING,
      unique: true
    },
    service_id: DataTypes.INTEGER
  
});
User.associate = (models) => {
  const { Service, Role, Command, Product_Command } = models;

  User.belongsTo(Service, { foreignKey: 'service_id' });
  User.belongsToMany(Role, { through: 'User_Role', foreignKey: 'user_id' });
  User.hasMany(Command, { foreignKey: 'user_id' });
};
return User;
}
