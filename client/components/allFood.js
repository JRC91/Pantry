import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToPantryThunk, updateQuantityPantryThunk, setPantryThunk } from '../store/pantry'
import { setFoodThunk } from '../store/food';
import { fetchUserThunk } from '../store/user';


export function AllFood(props) {

  let [renderFoods, setRender] = useState([])




  const loadTheFood = async () => {
    await props.fetchFood();

  }

  const loadPantry = async () => {
   await props.fetchPantry(props.auth.id)
  }


    //this filter function is going to check if the pantry of the user
       //already has the food being rendered, to shorten the process, I did a for loop with a break so that it won't go through the whole array if it doesn't have to

  const renderTheFood = () => {

      let userAddedAlready = props.pantry
      let containsAll = props.foods.filter(i => {
        let none = false
        for(let h = 0; h < userAddedAlready.length; h++){
          let curr = Object.values(userAddedAlready[h])

          if(curr.includes(i.name)){
            none = true
            break
          }
        }
        if(!none) {
          return true
        }
      })

      setRender(containsAll)
  }


  useEffect(  () => {
    loadTheFood(),
    loadPantry()
  }, [] );

  useEffect(() => {
    renderTheFood()
  }, [props.pantry])



  const checkIt = (newPantry) => {
    const userId = props.auth.id;

    let newRender = renderFoods.filter((food) => food.id !== newPantry.id);

      props.addToPantry(userId, newPantry.id);
      setRender(newRender)
    }


  if (!renderFoods.length) {
    return (
      <div>
      <div className='foodContainer'>
    <h1>No Food</h1>
    </div>
    </div>);
  } else {
    return (
      <div>
        <div className="foodListAll">
          {renderFoods.map((food) => (
                <form className="foodItem" key={food.id}>
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
                        type="button"
                        onClick={() => {
                          checkIt(food);
                        }}
                      >
                        Add to Pantry
                      </button>

                  </h2>
                </form>
              ))}
        </div>
      </div>
    );
}}

const mapStateToProps = (reduxState) => ({
  foods: reduxState.food,
  pantry: reduxState.pantry,
  auth: reduxState.auth
});
const mapDispatchToProps = (dispatch) => ({
  fetchFood: () => dispatch(setFoodThunk()),
  fetchUser: (id) => dispatch(fetchUserThunk(id)),
  addToPantry: (id, food, quantity) =>
    dispatch(addToPantryThunk(id, food)),
  updatePantry: (id, foodId, qty) =>
    dispatch(updateQuantityPantryThunk(id, foodId, qty)),
    fetchPantry: (id) => dispatch(setPantryThunk(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(AllFood);
