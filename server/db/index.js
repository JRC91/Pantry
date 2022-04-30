//this is the access point for all things database related!

const db = require('./db')
const Food = require('./models/Food')
const Recipe = require('./models/Recipes')
const User = require('./models/User')
const Ingredient = require('./models/Ingredient')
const Pantry = require('./models/Pantry')
//associations could go here!


Food.belongsToMany(User, {through: Pantry});
User.belongsToMany(Food, {through: Pantry})
Food.belongsToMany(Recipe, {through: Ingredient});
Recipe.belongsToMany(Food, {through: Ingredient})
User.hasMany(Recipe);


module.exports = {
  db,
  User,
  Food,
  Recipe,
  Pantry,
  Ingredient,
}
