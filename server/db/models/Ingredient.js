const Sequelize = require('sequelize')
const db = require('../db')



const Ingredient = db.define('ingredient', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
    },
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

module.exports = Ingredient;
