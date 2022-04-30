import axios from 'axios';
const token = window.localStorage.getItem('token')
//Input for the axios routes is up to being change, routes work with postman/insomnia

let reqInstance = axios.create({
  headers: {
    Authorization : window.localStorage.getItem('token')
    }
  }
)






const initialState = [];

//Action Constants
const SetPantry = 'SET_PANTRY';
const ClearPantry = 'CLEAR_PANTRY';
const RemoveFromPantry = 'REMOVE_FROM_PANTRY';
const AddToPantry = 'ADD_TO_PANTRY';
const UpdateQuantityPantry = 'UPDATE_QUANTITY_PANTRY';

//Action Creators
const setPantry = (pantry) => {
  return { type: SetPantry, pantry };
};

const clearPantry = () => {
  return { type: ClearPantry };
};

const removeFromPantry = (ingredient) => {
  return {
    type: RemoveFromPantry,
    ingredient,
  };
};

const addToPantry = (newIngredient) => {
  return {
    type: AddToPantry,
    newIngredient,
  };
};

const updatePantry = (ingredient) => {
  return {
    type: UpdateQuantityPantry,
    ingredient,
  };
};

//THUNKS
export const setPantryThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await reqInstance.get(`/api/users/${id}/pantry`)
      let pantry = response.data;
      dispatch(setPantry(pantry));
    } catch (err) {
      console.log(err);
    }
  };
};

export const clearPantryThunk = (id) => {
  return async function (dispatch) {
    try {
      await reqInstance.delete(`/api/users/${id}/pantry/clear`)
      dispatch(clearPantry());
    } catch (err) {
      console.log(err);
    }
  };
};

//this will complete the order and clear the state for this pantry

export const removeFromPantryThunk = (id, pantry) => {
  return async function (dispatch) {
    try {
      await reqInstance.delete(`/api/users/${id}/pantry/${pantry.id}/remove`)
      dispatch(removeFromPantry(pantry));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToPantryThunk = (id, foodId, quantity) => {
  return async function (dispatch) {
    try {
      let response = await reqInstance.post(`/api/users/${id}/pantry/add`, {
        foodId,
        quantity,
      });
      const newIngredient = response.data;
      dispatch(addToPantry(newIngredient));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateQuantityPantryThunk = (id, ingredientId, inventory) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/users/${id}/pantry/update`, {
        ingredientId: ingredientId,
        inventory: inventory,
      });
      let newIngredient = response.data;
      dispatch(updatePantry(newIngredient));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function pantryReducer(state = initialState, action) {
  switch (action.type) {
    case SetPantry:
      return action.pantry;
    case UpdateQuantityPantry:
      return state.map((ingredient) =>
          ingredient.id === action.ingredient.id ? action.ingredient : ingredient
        )
    case AddToPantry:
      return [...state, action.newIngredient]
    case ClearPantry:
      return initialState;
    case RemoveFromPantry:
      return state.filter((ingredient) => ingredient.id !== action.ingredient.id);
    default:
      return state;
  }
}
