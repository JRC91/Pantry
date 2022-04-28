const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  desription: {
    type: Sequelize.TEXT
  },
  cuisine : {
    type: Sequelize.STRING,
  },
  duration: {
    type: Sequelize.INTEGER,
  },
  imgUrl: {
    type: Sequelize.STRING,
  },
  vidUrl: {
    type: Sequelize.STRING,
  },
  guide: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  equipment: {
  type: Sequelize.TEXT
  },

  course: {
    type: Sequelize.STRING,
    validate: {
      isIn: {

        args: [["main", "side", 'dressing', 'gravy', 'soup', 'salad'
      ]],
        msg: "Must be a valid part of a meal",
      },
    }
  },
  day: {
    type: Sequelize.STRING,
    validate: {
      isIn: {

        args: [["breakfast", "brunch", "lunch", "dinner", "dessert", 'snack'
      ]],
        msg: "Must be a valid meal of the day",
      },
    }
  }

})


module.exports = Recipe;
