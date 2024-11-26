module.exports = (sequelize, DataTypes) => {
    const Issue = sequelize.define('Issue', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Subsystem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Component: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    return Issue;
  };