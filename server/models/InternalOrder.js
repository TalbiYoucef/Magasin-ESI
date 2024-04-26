module.exports = (sequelize, DataTypes) => {
    const InternalOrder = sequelize.define("InternalOrder", {
      internal_order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("initialized", "validated", "accepted", "satisfied"),
        allowNull: false,
        defaultValue: "initialized",
      },
    });
    InternalOrder.associate = (models) => {
      const { ExitNote } = models;
      InternalOrder.hasOne(ExitNote, { foreignKey: 'exit_note_id' });
      ExitNote.belongsTo(InternalOrder, { foreignKey: 'exit_note_id' });
    };
    return InternalOrder
  };