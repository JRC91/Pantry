import axios from 'axios';
const token = window.localStorage.getItem('token')
//Input for the axios routes is up to being change, routes work with postman/insomnia

let reqInstance = axios.create({
  headers: {
    Authorization : token
    }
  }
)
const initialState = {}

const SetRecipe = 'SET_RECIPE'

export const setRecipes = (recipe) => {
  return { type: SetRecipe,
            recipe
  }
}

export const setRecipeThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await reqInstance.get(`/api/recipes/${id}`)
      let recipe = response.data
      dispatch(setRecipes(recipe))
    }
    catch (err){
      console.log(err)
    }
  }
}



export default function singleRecipeReducer(state = initialState, action){
  switch(action.type){
    case SetRecipe:
      return action.recipe
    default:
      return state
  }
}
