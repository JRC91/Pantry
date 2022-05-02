import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setRecipeThunk } from "../store/singleRecipe";

function SingleRecipe (props) {


useEffect(() => {
  try{
    console.log(props)
    const foodId = props.match.params.id
    console.log(props)
    props.fetchRecipe(foodId)
  }
  catch (error) {
    console.log(error);
  }
}, [])

const recipe = props.recipe

return (
  <div>
    <form className ='recipeShow'>
      <h1>{recipe.name}</h1>
      {recipe.vidUrl}
      <img href={recipe.imgUrl} />
      <h2>Duration: {recipe.duration} minutes</h2>
      <p></p>
      <p>{recipe.guide}</p>
    </form>
  </div>
)



}


const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
    pantry: state.pantry
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRecipe: (id) => dispatch(setRecipeThunk(id))
})

export default connect (mapStateToProps, mapDispatchToProps)(SingleRecipe)
