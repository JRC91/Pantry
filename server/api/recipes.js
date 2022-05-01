const router = require('express').Router();
const {Recipe, Ingredient} = require('../db')
module.exports = router
const {requireToken, isAdmin} = require('./gatekeep')

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try{
    const recipes = await Recipe.findAll()
    res.json(recipes)
  }
  catch(err) {next(err)}
})

router.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try{
    const recipe = await Recipe.findByPk(req.params.id)
    res.json(recipe)
  }
  catch(err) {next(err)}
})

router.post('/add', requireToken, async (req, res, next) => {
  try{
    console.log(req.body, 'reqbody for create Recipe')
    const recipe = await Recipe.create(req.body.recipe)
    console.log(recipe, 'can I see')
    if(req.body.ingredients.length){
      req.body.ingredients.map(async (ingredient) => {
        if(ingredient !== null){
        await Ingredient.create({
          recipeId: recipe.id,
          foodId: ingredient.id
        })}
      })
    }
    await recipe.reload()
    res.json(recipe)
  }
  catch(err) {next(err)}
})

router.put('/:id/edit',requireToken, isAdmin, async (req, res, next) => {
    try {
      const recipe = await Recipe.findByPk(req.params.id)
      const updateRecipe = recipe.update(req.body)
      res.json(updateRecipe)
    }
    catch(err) {next(err)}
})

router.delete(('/:id/delete'), requireToken, isAdmin, async (req, res, next) => {
  try {
    let deleteRecipe = await Recipe.findByPk(req.params.id)
    let deletedRecipe = await deleteRecipe.destroy()
    res.json(deletedRecipe)
}
  catch (err){next(err)}
})

router.put(('/:id/addfood'),  requireToken, isAdmin, async (req, res, next) => {
  try {
    for(let i = 0; i < req.body.ingredients.length; i++){
      let ingredient = req.body.ingredients[i]
      await Ingredient.create({
        recipeId: req.params.id,
        foodId: ingredient.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        expirationDate: ingredient.longevity,
        subsitute: ingredient.subsitute
      })
    }
    let recipe = await Recipe.findByPk(req.params.id)
    res.json(recipe)
}
  catch (err){next(err)}
})
