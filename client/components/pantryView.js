import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setPantryThunk, clearPantryThunk, removeFromPantryThunk, updateQuantityPantryThunk  } from "../store/pantry";
//Possible rendition of Pantry, piggy-backed off of AllFoods page, have to add quantity change option.
// NOT ADDED TO ROUTES YET

export function Pantry(props) {
  const [quantity, setQuantity] = useState([])
  let [pantry, setPantry] = useState([]);
  let quantityArr = []
  let previousState = usePrevious(pantry);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const removeItem = (userId, foodId) => {
    let pantryCopy = [...pantry];
    pantryCopy = pantryCopy.filter((item) => item.id !== foodId);
    props.removeFood(userId, foodId)
    setPantry(pantryCopy);
  };

  const handleChange = (evt) => {
    setQuantity([evt.target.value]);
    quantityArr[evt.target.name]=evt.target.value
  };

  const handleSubmit = (pantryItem) => {
    //check to see if product is in pantry if so increment qty of the pantry if not add item to the pantry

    const pantry = props.pantry;
    const userId = props.auth.id;
    let filter = pantry.filter((food) => food.id === pantryItem.id);
    if (filter.length) {
      let newquantity = (1 *  quantity);
      if(newquantity > pantryItem.quantity){
        newquantity = pantryItem.quantity
      }
      props.updateCart(userId, pantryItem.id, newquantity);
    }
    }

  useEffect(() => {
    props.fetchPantry(props.auth.id)
    if(props.auth.id){
      setPantry(props.pantry)
      }
    }, []);

  // useEffect((previousState) => {
  //   if (previousState !== props.pantry) {
  //     setPantry(props.pantry || []);
  //   }
  // });



  if (!pantry.length && !props.pantry.length) {
    return <h2>Pantry Empty</h2>;
  }
  return (
    <div className="foodListAll">
      {!props.auth.length
        ? pantry.map((food) => {
            return (
              <div className='foodContainer' key={food.id}>
                <img src={food.imageUrl} className="photo" />
                <h4>
                    {` ${food.name}`}
                  {/* <input
          onChange={handleChange}
          type="number"
          name={food.id}
          min="1"
          max={`${food.quantity}`}
          placeholder="1"
          value={quantity}
        ></input> */}
         {/* <button type="submit" onClick={ () =>{

           handleSubmit(food)}}>
          Change Amount
        </button> */}
                  <button
                    type="submit"
                    className="delete"
                    onClick={() => removeItem(props.auth.id, food.id)}
                  >
                    X
                  </button>
                </h4>
              </div>
            );
          })
        : <></>}
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  pantry: reduxState.pantry,
  auth: reduxState.auth,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPantry: (id) => dispatch(setPantryThunk(id)),
  removeFood: (id, foodId) => dispatch(removeFromPantryThunk(id, foodId)),
  clearPantry: (id) => dispatch(clearPantryThunk(id)),
  changeQuantity: (id) => dispatch(updateQuantityPantryThunk(id)),
  updatePantry: (id, foodId, qty) =>
    dispatch(updateQuantityPantryThunk(id, foodId, qty))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pantry);
