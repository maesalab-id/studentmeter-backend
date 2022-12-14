// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const classes = sequelizeClient.define('classes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  classes.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    classes.belongsTo(models.study_programs, { onDelete: 'cascade' });
    classes.hasMany(models.attendances, { onDelete: 'cascade' });
    classes.hasMany(models.schedules, { onDelete: 'cascade' });
  };

  return classes;
};
