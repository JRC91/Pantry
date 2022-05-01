import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToPantryThunk, updateQuantityPantryThunk, setPantryThunk } from '../store/pantry'
import { setFoodThunk } from '../store/food';


export function AllFood(props) {
  let [foodSelection, setFoods] = useState([]);
  let [userPantry, setPantry] = useState([]);
  let [renderFoods, setRender] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let previousState = usePrevious(userPantry);


  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const loadTheFood = async () => {
    await props.fetchFood();

    setFoods(props.foods)
  }

  const loadPantry = async () => {
    await props.fetchPantry(props.user.id)
    setPantry(props.pantry)
  }

  useEffect((previousState) => {
    if (previousState !== props.pantry) {
      setPantry(props.pantry || []);
    }
  });


  const renderTheFood = async () => {
    console.log('render')
    if (props.user.id){
      let userAddedAlready = userPantry
      if(props.pantry.length){
      let containsAll = foodSelection.filter(i => {
       //this filter function is going to check if the pantry of the user
       //already has the food being rendered, to shorten the process, I did a for loop with a break so that it won't go through the whole array if it doesn't have to
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
      setIsLoading(false)
      setRender(containsAll) }}
  }

  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  // const prevAmount = usePrevious(props.foods)
  // useEffect( () => { loadPantry(userPantry) }, [userPantry] )
  // useEffect( () => { loadTheFood(foodSelection) }, [foodSelection] );
  useEffect( () => { loadTheFood(), loadPantry(), renderTheFood()}, [] );
  useEffect((previousState) => {
    if (previousState !== props.pantry) {
      setPantry(props.pantry || []);
    }
  });


  const checkIt = (newPantry) => {
    const userId = props.user.id;

    let newRender = renderFoods.filter((food) => food.id !== newPantry.id);
    console.log(newRender)
      props.addToPantry(userId, newPantry.id);
      setRender(newRender)
    }

console.log()
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
        <div className="foodContainer">
          {renderFoods.map((food) => (
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
  foods: reduxState.food,
  user: reduxState.auth,
  pantry: reduxState.pantry,
});
const mapDispatchToProps = (dispatch) => ({
  fetchFood: () => dispatch(setFoodThunk()),
  addToPantry: (id, food, quantity) =>
    dispatch(addToPantryThunk(id, food)),
  updatePantry: (id, foodId, qty) =>
    dispatch(updateQuantityPantryThunk(id, foodId, qty)),
    fetchPantry: (id) => dispatch(setPantryThunk(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(AllFood);
