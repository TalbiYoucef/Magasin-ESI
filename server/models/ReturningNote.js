module.exports = (sequelize, DataTypes) => {
    const ReturnNote = sequelize.define("ReturnNote", {
      return_note_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment : DataTypes.STRING,
      returning_date :{
        type: DataTypes.DATE,
        allowNull: false,
      }
    });
    return ReturnNote
  };