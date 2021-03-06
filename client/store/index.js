import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import pantry from './pantry'
import recipes from './recipes'
import food from './food'
import user from './user'
import singleRecipe from './singleRecipe'

const reducer = combineReducers({
  auth:auth,
  pantry: pantry,
  food: food,
  user: user,
  recipes: recipes,
  recipe: singleRecipe
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
