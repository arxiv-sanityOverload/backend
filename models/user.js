'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    login_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    github: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    is_admin: DataTypes.BOOLEAN,
    library_id: DataTypes.STRING,
    user_data_id: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
