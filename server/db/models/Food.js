const Sequelize = require('sequelize')
const db = require('../db')



const Food = db.define('food', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,

    },
  },
  type : {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: {

        args: [["vegetable", "fruit", "red meat", "poultry",
        "shellfish", "fish", "dairy", "egg", "grain", "bean", "nut", 'herb', 'spice', 'oil', 'dressing', 'stock', 'soup', 'condiment'
      ]],
        msg: "Must have a food group!",

      },
    },
  },
  imgUrl: {
    type: Sequelize.STRING,
  },
  //in minutes
  longevity: {
    type: Sequelize.INTEGER
  }


});

module.exports = Food;
