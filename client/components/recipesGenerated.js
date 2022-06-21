import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setPantryThunk } from "../store/pantry";
import { selectedRecipesThunk } from "../store/recipes";

class RecipeGenerator extends React.Component {
  constructor () {
    super()
    this.state ={
      recipes: []
    }
    this.accordionContent =[]
    this.accordionToggle = this.accordionToggle.bind(this)
  }

  componentDidMount(){
    this.props.fetchPantry(this.props.user.id)
    this.props.getRecipes(this.props.user.id)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.recipes !== this.props.recipes){
      this.setState({
        recipes: this.props.recipes || [],
      })
    }
  }

  accordionToggle(key) {
    let changes = this.accordionContent[key]
    if(changes.style.display === 'none'){
      changes.style.display = 'block'
      return
    }
    else {
      changes.style.display = 'none'
    }
  }

  render () {
    if(!this.state.recipes.length){
      return <h1>No Relevant Recipes Found</h1>}

    return (
      <div className="content">
      {this.state.recipes.map((recipe, key) => {

        let hasFood = 0;
        let noHasFood = 0;
        let IngredientsNeeded = []
        for(let i = 0; i< recipe.food.length; i++){
          if(recipe.food[i].users.length){
            hasFood++
            continue
          }
          else {
            IngredientsNeeded.push(recipe.food[i]);
            noHasFood++
          }
        }
        //This is a nested return, the percentage is calculated just before rendering
        return(
          <div key = {key}>
        <button type='button' onClick={()=>this.accordionToggle(key)} className ='collapsible'>
        Recipe: {recipe.name}
        <h3>Percentage Acquired: {hasFood !==0 ? Math.floor((hasFood/recipe.food.length)*100) : '0'}%</h3>
        </button>
        <form style={{display: 'none'}} ref={accordionContent => this.accordionContent[key] = accordionContent} >
          <h5>{recipe.description}</h5>
        <h5>Ingredients: {recipe.food.map((ingredient, index) =>
        <span className="listSpan"><p key={ingredient.id}>{index == recipe.food.length-1 && recipe.food.length > 1 ?
          `and ${ingredient.name}.` : `${ingredient.name},`
        }</p></span>)}
        </h5>
        {noHasFood > 0 ? <p>You are missing {IngredientsNeeded.map((h, index) =>{
        if(index == IngredientsNeeded.length-1 && IngredientsNeeded.length > 1){
          return `and ${h.name}.`
        }
         else {return `${h.name}, `}
        }
        )} </p>
        :
        <p>You have everything needed!</p> }
        </form>
        <Link to={`/recipes/${recipe.id}`}> Check it out!</Link>
        </div>
        )
      }
      )}
      </div>
    )
  }

}

function mapState (reduxState) {
  return {
  recipes: reduxState.recipes,
  user: reduxState.auth,
  pantry: reduxState.pantry,
  }
}

function mapDispatch (dispatch) {
  return {
   fetchPantry: (id) => dispatch(setPantryThunk(id)),
   getRecipes: (id) => dispatch(selectedRecipesThunk(id))
  }
}

export default connect(mapState, mapDispatch)(RecipeGenerator)
