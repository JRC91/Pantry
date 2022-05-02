const router = require('express').Router()
const { Sequelize } = require('sequelize')
const { User, Ingredient, Food, Pantry, Recipe, db } = require('../db')
const { QueryTypes } = require('sequelize')
const {requireToken, isAdmin} = require('./gatekeep')
module.exports = router

router.get('/', requireToken, isAdmin, async (req, res, next) => {
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

router.get('/:id/pantry', requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'username'],
      include: {
        model: Food
      }
    })
    res.json(user.food)
  } catch (err) {
    next(err)
  }
})


router.post('/:id/pantry/add', requireToken, async (req, res, next) => {
  try {
    console.log(req.body, 'this is reqbody for Pantry Add');
    let {foodId} = req.body
    let newFood = await Pantry.create({
      foodId: foodId,
      userId: req.params.id
    });
    let pantry = await User.findOne({
      where: {id: req.params.id},
      include: {
        model: Food,
        where: {id: foodId },
    }
  })
    res.send(pantry.food[pantry.food.length-1]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/pantry/:foodId', requireToken, async (req, res, next) => {
  try {
    console.log(req.params, 'this is reqbody for delete Pantry');

    let byeFood = await Pantry.findOne({where: {
      userId: req.params.id,
      foodId: req.params.foodId
    }});
    let deleted = await byeFood.destroy()

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/pantry/', requireToken, async (req, res, next) => {
  try {
    console.log(req.body, 'this is reqbody');

    let changedFood = await Pantry.findOne({where: {
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

//includes the recipes and the associated ingredients that are shared with user's pantry, ordered for some reason
router.get('/:id/curated',  async (req, res, next) => {
  let number = req.params.id
  try {
    let recipes = await Recipe.findAll({
      include: [{
        model: Food,
        required: true,
        left: true,
        include: [{
          model:User,
          where: {id: req.params.id},
          required: false,
          attributes: ['id'],
          include: [{
            model: Food,
            required: true,
            attributes: []
          }]
        }],
      }],
     })
     console.log(recipes)
     res.send(recipes)
  }
  catch (err) {
    next(err);
  }
})
//limit and offset might be useful if the database grows more


