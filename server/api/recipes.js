const router = require('express').Router();
const {Recipe, Ingredient} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const recipes = Recipe.findAll()
    res.json(recipes)
  }
  catch(err) {next(err)}
})

router.get('/:id', async (req, res, next) => {
  try{
    const recipe = Recipe.findByPk(req.params.id)
    res.json(recipe)
  }
  catch(err) {next(err)}
})

router.post('/add', async (req, res, next) => {
  try{
    const recipe = Recipe.create(req.body)
    res.json(recipe)
  }
  catch(err) {next(err)}
})

router.put('/:id/edit', async (req, res, next) => {
    try {
      const recipe = Recipe.findByPk(req.params.id)
      const updateRecipe = recipe.update(req.body)
      res.json(updateRecipe)
    }
    catch(err) {next(err)}
})

router.delete(('/:id/delete'), async (req, res, next) => {
  try {
    let deleteRecipe = await Recipe.findByPk(req.params.id)
    let deletedRecipe = await deleteRecipe.destroy()
    res.json(deletedRecipe)
}
  catch (err){next(err)}
})

router.put(('/:id/addfood'),  async (req, res, next) => {
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
