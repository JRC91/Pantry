import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToPantryThunk, updateQuantityPantryThunk } from '../store/'
import { setFoodThunk } from '../store/';


export function AllFood(props) {
  let [pantry, setPantry] = useState([]);

  useEffect(() => {
    props.fetchFood();
    if (props.user.id){
      let userAddedAlready = props.user.ingredients
      let foodList = props.food
      let containsAll = foodList.filter(i => !userAddedAlready.includes(i));
      setPantry(containsAll) }
  }, []);

  const checkIt = (food) => {
    const pantry = props.pantry;
    const userId = props.user.id;

      props.addToPantry(userId, food.id);
    }


  if (!props.foods.length) {
    return (
      <div>
      <div className='foodContainer'>
    <h1>No Food</h1>
    </div>
    </div>);
  } else {
    return (
      <div>
        <div className="foodContainer">
          {props.foods.map((food) => (
                <div className="foodItem" key={food.id}>
                  <img src={food.imageUrl} className="photo" />
                  <h2>
                    <Link
                      className="listingInfo"
                      to={`/foods/${food.id}/`}
                    >
                      {food.name}
                    </Link>
                    <br />

                      <button
                        type="submit"
                        onClick={() => {
                          checkIt(food);

                        }}
                      >
                        Add to Pantry
                      </button>

                  </h2>
                </div>
              ))}
        </div>
      </div>
    );
}}

const mapStateToProps = (reduxState) => ({
  foods: reduxState.foods,
  user: reduxState.auth,
  pantry: reduxState.pantry,
});
const mapDispatchToProps = (dispatch) => ({
  fetchFood: () => dispatch(setFoodThunk()),
  addToPantry: (id, food, quantity, price) =>
    dispatch(addToPantryThunk(id, food, inventory, price)),
  updatePantry: (id, foodId, qty) =>
    dispatch(updateQuantityPantryThunk(id, foodId, qty)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllFood);
