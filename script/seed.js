'use strict'

const {db, User, Food, Ingredient, Recipe } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */


 const users = [
  {
    username: "cody",
    password: "123",

  },
  {
    username: "murphy",
    password: "123",
  },
];

const foods = [
  {
    name: 'Eggs',
    type: 'egg',
  },
  {
    name: 'Bacon',
    type: 'red meat'
  },
  {
    name: 'Potatos',
    type: 'vegetable',
  },
  {
    name: 'Apples',
    type: 'fruit',
  },
  {
    name: 'Beef Chop Meat',
    type: 'red meat',
  },
  {
    name: 'Tuna Fish',
    type: 'fish',
  },
  {
    name: 'Banana',
    type: 'fruit',
  },
  {
    name: 'Milk',
    type: 'dairy',
  },
  {
    name: 'Black Beans',
    type: 'bean',
  },
  {
    name: 'Olive Oil',
    type: 'oil',
  },
  {
    name: 'Penne',
    type: 'grain',
  },
]


async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );
  await Promise.all(
    foods.map((food) => {
      return Food.create(food);
    })
  );
  console.log(`seeded ${users.length} users and ${foods.length} foods!`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
