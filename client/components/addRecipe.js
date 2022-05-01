import React from "react";
import { connect } from 'react-redux';
import { setFoodThunk } from "../store/food";
import { makeRecipeThunk } from "../store/recipes";
import { AllFood } from "./allFood";


export class RecipeCreator extends React.Component {
  constructor() {
    super()
    this.state = {
      recipe:{
        name: '',
        description: '',
        cuisine: '',
        duration: 0,
        imgUrl: '',
        vidUrl: '',
        guide: '',
        equipment: '',
        course: 'main',
        day: 'breakfast',

      },
      ingredients: [],
      err: false,
      errmessage: '',
      foods: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.fetchFood()

    this.setState({
      foods: this.props.foods,
      ingredients: new Array(this.props.foods.length)
    })
  }
  componentDidUpdate(prevProps){
    if(prevProps.foods !== this.props.foods){
      this.setState({
        foods: this.props.foods || []
      })
    }
  }

  addToRecipe (food){
    let array = this.state.ingredients
    array[food.id] = food
    this.setState({
      ingredients: array
    })
  }

  removeFromRecipe (food){
    let array = this.state.ingredients
    array[food.id] = null

    this.setState({
      ingredients: array
    })
  }

  handleChange (evt){
    if(evt.target.name === 'duration'){
      let vars = this.state.recipe
      vars.duration =Number(evt.target.value)
      this.setState({vars})
    }
    let vars = this.state.recipe
    vars[evt.target.name] = evt.target.value
    this.setState({
      vars,
    })
  }

  handleSubmit(){
    let recipe = this.state.recipe
    recipe.userId = this.props.auth.id
    let ingredients = this.state.ingredients
    this.props.addRecipe(recipe, ingredients)

  }


  render () {
    const recipe = this.state.recipe
    console.log(recipe)
    return (

      <div className="entryForm">
         <form onChange={this.handleChange}>
      <span><h3>Recipe Name:</h3></span>
      <span><input type="text" name="name" value={recipe.name} /></span>

      <span><h3>Description:</h3></span>
      <span> <input type="text" name="description" value={recipe.lastName}  />
      </span><br />
      <span><h3>Cuisine:</h3></span>
      <span><input type="text" name="cuisine" value={recipe.recipe}  /></span>

      <span><h3>Image (URL):</h3></span>
      <span><input type="text" placeholder="https://" name="imageUrl" value={recipe.imageUrl}  /></span><br />

      <span><h3>Duration (minutes:)</h3></span>
      <span><input type="number" step='1' placeholder='0'  name="duration"  min="0" max="480" /> </span>

      <h3>Written Guide:</h3>
      <textarea rows="4" cols="50" name="guide" value={recipe.guide}  /> <br />

      <h3>Time of Day:</h3>
      <select name='day'>
      <option value="breakfast">Breakfast</option>
      <option value="brunch">Brunch</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="dessert">Dessert</option>
      <option value="snack">Snack</option>
      </select>

      <h3>Type of Course:</h3>
      <select name='course'>
      <option value="main">Main</option>
      <option value="side">Side</option>
      <option value="dressing">Dressing</option>
      <option value="gravy">Sauce</option>
      <option value="soup">Dessert</option>
      <option value="salad">Salad</option>
      </select>

      <span><h3>Image (URL):</h3></span>
      <span><input type="text" placeholder="https://i.imgur.com/zmPe3Wa.jpeg" name="imageUrl" value={recipe.imageUrl}  /></span><br />

      <button onClick={this.handleSubmit}>
        Submit Recipe
      </button>
      <span><h3>Ingredients:</h3></span>
      {this.state.ingredients.map((ingredient) => {
      if(ingredient !== null){
      return <p key={ingredient.id}>{ingredient.name}</p>}})}

     {/* <span><button type="button" onClick={this.handleSubmit}>Submit</button> </span> */}
      </form>
     {this.state.foods ? this.state.foods.map((food) => (
                <div className="foodItem" key={food.id}>
                  <img src={food.imageUrl} className="photo" />
                  <h2>
                      {food.name}
                    <br />
                    {this.state.ingredients.includes(food) ?
                      <button
                        type="submit"
                        onClick={() => {
                          this.removeFromRecipe(food);
                        }}
                      >
                        Remove from Recipe
                      </button> :
                      <button
                        type="submit"
                        onClick={() => {
                          this.addToRecipe(food);
                        }}
                      >
                        Add to Recipe
                      </button>}

                  </h2>
                </div>)) : <p>Loading Ingredinets</p>}

      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    foods: state.food,
    auth: state.auth
  }
}
function mapDispatchToProps (dispatch) {
  return {
    fetchFood: () => dispatch(setFoodThunk()),
    addRecipe: (recipe, ingredients) => dispatch(makeRecipeThunk(recipe, ingredients))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreator)
