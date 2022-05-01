import axios from 'axios';
const token = window.localStorage.getItem('token')
//Input for the axios routes is up to being change, routes work with postman/insomnia

let reqInstance = axios.create({
  headers: {
    Authorization : token
    }
  }
)
const initialState = []

//action constants
const SetRecipes = 'SET_RECIPES'
const SelectedRecipes = 'SELECTED_RECIPES'
const AddRecipe = 'ADD_RECIPE'
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

export const addRecipe = (recipe) => {
  return {type: AddRecipe,
          recipe
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
        let response = await reqInstance.get(`/api/users/${id}/curated`)
        let recipes = response.data
        dispatch(selectedRecipes(recipes))
      }
      catch (err){
        console.log(err)
      }
    }
}

export const makeRecipeThunk = (recipe, ingredients) => {
  return async function (dispatch) {
    try {
      let response = await reqInstance.post(`/api/recipes/add`, {
        recipe,
        ingredients
      })
      let newRecipe = response.data
      dispatch(addRecipe(newRecipe))
    }
    catch (err){
      console.log(err)
    }
  }
}


export default function recipesReducer(state = initialState, action){
  switch(action.type){
    case SetRecipes:
      return action.recipes
    case SelectedRecipes:
      return action.recipes
    case AddRecipe:
      return [...state, action.recipe]
    default:
      return state
  }
}
