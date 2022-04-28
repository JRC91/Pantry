//this is the access point for all things database related!

const db = require('./db')
const Food = require('./models/Food')
const Recipe = require('./models/Recipes')
const User = require('./models/User')
const Ingredient = require('./models/Ingredient')
//associations could go here!


Food.belongsToMany(User, {through: Ingredient});
Food.belongsToMany(Recipe, {through: Ingredient});
User.hasMany(Recipe);


module.exports = {
  db,
  User,
  Food,
  Recipe,
  Ingredient,
}
