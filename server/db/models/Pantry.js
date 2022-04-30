const Sequelize = require('sequelize')
const db = require('../db')



const Pantry = db.define('pantry', {
  quantity: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // },
  },
  unit: {
    type: Sequelize.STRING
  },
  expirationDate: {
    type: Sequelize.DATE
  },
  substitute: {
    type: Sequelize.STRING
  },


});

module.exports = Pantry;
