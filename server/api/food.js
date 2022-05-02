const router = require('express').Router();
const {Food} = require('../db')
module.exports = router
const {requireToken, isAdmin} = require('./gatekeep')


router.get('/', requireToken, async (req, res, next) => {
  try{
    const foods = await Food.findAll()
    res.json(foods)
  }
  catch(err) {next(err)}
})

router.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try{
    const food = await Food.findByPk(req.params.id)
    res.json(food)
  }
  catch(err) {next(err)}
})

router.post('/add',requireToken, isAdmin, async (req, res, next) => {
  try{
    const food = await Food.create(req.body)
    res.json(food)
  }
  catch(err) {next(err)}
})

router.put('/:id/edit', requireToken, isAdmin, async (req, res, next) => {
    try {
      const food = await Food.findByPk(req.params.id)
      const updateFood = food.update(req.body)
      res.json(updateFood)
    }
    catch(err) {next(err)}
})

router.delete('/:id/delete', requireToken, isAdmin, async (req, res, next) => {
  try {
    let deleteFood = await Food.findByPk(req.params.id)
    let deletedFood = await deleteFood.destroy()
    res.json(deletedFood)
}
  catch (err){next(err)}
})
