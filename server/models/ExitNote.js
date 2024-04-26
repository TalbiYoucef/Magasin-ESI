module.exports = (sequelize, DataTypes) => {
    const ExitNote = sequelize.define("ExitNote", {
      exit_note_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      exit_date:{
          type: DataTypes.DATE,
          allowNull: false,
      },
      type : {
        type: DataTypes.ENUM("discharge","exit"),
        allowNull: false,
        defaultValue: "exit",
      },
      comment : DataTypes.STRING,
      expected_returning_date :{
        type: DataTypes.DATE,
        allowNull: true,
      }
    });
    ExitNote.associate = (models) => {
        const { ReturnNote } = models;
        ExitNote.hasOne(ReturnNote, { foreignKey: {allowNull:true} });
        ReturnNote.belongsTo(ExitNote, { foreignKey: 'exit_note_id' });
      };
    return ExitNote
  };