const router = require('express').Router();
const {Food} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const foods = Food.findAll()
    res.json(foods)
  }
  catch(err) {next(err)}
})

router.get('/:id', async (req, res, next) => {
  try{
    const food = Food.findByPk(req.params.id)
    res.json(food)
  }
  catch(err) {next(err)}
})

router.post('/add', async (req, res, next) => {
  try{
    const food = Food.create(req.body)
    res.json(food)
  }
  catch(err) {next(err)}
})

router.put('/:id/edit', async (req, res, next) => {
    try {
      const food = Food.findByPk(req.params.id)
      const updateFood = food.update(req.body)
      res.json(updateFood)
    }
    catch(err) {next(err)}
})

router.delete(('/:id/delete'), async (req, res, next) => {
  try {
    let deleteFood = await Food.findByPk(req.params.id)
    let deletedFood = await deleteFood.destroy()
    res.json(deletedFood)
}
  catch (err){next(err)}
})
