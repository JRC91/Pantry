import axios from 'axios';
import { interfaces } from 'mocha';

const initialState = []

//action constants
const SetRecipes = 'SET_RECIPES'
const SelectedRecipes = 'SELECTED_RECIPES'
//figure ho to select specific recipes

//action creators
export const setRecipes = (recipes) => {
  return { type: SetRecipes,
           recipes
  }
}

export const selectedRecipes = (recipes) => {
  return {type: SelectedRecipes,
          recipes
        }
}

export const setRecipesThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get('/api/recipes')
      let recipes = response.data
      dispatch(setRecipes(recipes))
    }
    catch (err){
      console.log(err)
    }
  }
}

//for the customer input
export const selectedRecipesThunk = (id) => {
    return async function (dispatch) {
      try {
        let response = await axios.get(`/api/users/${id}/recipes`)
        let recipes = response.data
        dispatch(SelectedRecipes(recipes))
      }
      catch (err){
        console.log(err)
      }
    }
}

export default function recipesReducer(state = initialState, action){
  switch(action.type){
    case setRecipes:
      return action.recipes
    case SelectedRecipes:
      return action.recipes
    default:
      return state
  }
}
