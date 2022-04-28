const router = require('express').Router()
const { del } = require('express/lib/application')
const { User, Ingredient, Food } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/pantry', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      where: {id: req.params.id},
      attributes: ['id', 'username'],
      include: {
        model: Ingredient,
        include: Food
      }
    })
    res.json(user.ingredients)
  } catch (err) {
    next(err)
  }
})


router.post('/:id/pantry/', async (req, res, next) => {
  try {
    console.log(req.body, 'this is reqbody');

    let newFood = await Ingredient.create(
    req.body);

    res.send(newFood);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/pantry/', async (req, res, next) => {
  try {
    console.log(req.body, 'this is reqbody');

    let byeFood = await Ingredient.findOne({where: {
      userId: req.params.id,
      id: req.body.id
    }});
    let deleted = await byeFood.destroy()

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/pantry/', async (req, res, next) => {
  try {
    console.log(req.body, 'this is reqbody');

    let changedFood = await Ingredient.findOne({where: {
      userId: req.params.id,
      id: req.body.food.id
    }});
    await changedFood.update({
      quantity: req.body.food.quantity,
    })

    res.send(changedFood);
  } catch (err) {
    next(err);
  }
});
