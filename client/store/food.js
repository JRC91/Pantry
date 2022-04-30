import axios from 'axios';

//mostly for the All Food and EditFood pages on the Admin

const initialState = [];

const SetFood = 'SET_FOOD'
const FilterFood = 'FILTER_FOOD'
const AddFood = 'ADD_FOOD'
const DeleteFood = 'DELETE_FOOD'
const EditFood = 'EDIT_FOOD'

export const setFood = (food) => {
  return {
    type: SetFood,
    food
  }
}
export const addFood = (food) => {
  return {
    type: AddFood,
    food
  }
}

export const deleteFood = (food) => {
  return {
    type: DeleteFood,
    food
  }
}
export const editFood = (food) => {
  return {
    type: EditFood,
    food
  }
}

export const filterFood = (food) => {
  return {
    type: FilterFood,
    food
  }
}

export const setFoodThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get('/api/foods');
      let food = response.data;
      dispatch(setFood(food));
    } catch (err) {
      console.log(err);
    }
  };
};
export const addFoodThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.post(`/api/food/`);
      let food = response.data
      dispatch(AddFood(food));
    } catch (err) {
      console.log(err);
    }
  }
}

export const deleteFoodThunk = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/food/${id}`);
      await dispatch(deleteFood(id));
    } catch (err) {
      console.log(err);
    }
  };
}

export const editFoodThunk = (food) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/products/${food.id}`, food);
      let updateFood = response.data;
      dispatch(editFood(updateFood));
    } catch (err) {
      console.log(err);
    }
  };
};

//consider putting the filter in place here as per the user.
export default function foodReducer(state = initialState, action){
  switch(action.type){
    case SetFood:
      return action.food
    case AddFood:
      return [...state, action.food]
    case DeleteFood:
      return state.filter((food) => food.id !== action.food.id)
    case EditFood:
      return state.map((food) => food.id === action.food.id ? action.food : food)
    default:
      return state
  }
}
