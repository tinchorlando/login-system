const { DataTypes, sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "data",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
    }
  );
};
