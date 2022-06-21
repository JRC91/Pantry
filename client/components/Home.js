import React from 'react'
import {connect} from 'react-redux'
import { setPantryThunk } from '../store/pantry'
import { connect } from 'react-redux';



/**
 * COMPONENT
 */
export const Home = props => {
  const {user} = props

  React.useEffect( () => {
    props.fetchPantry(user.id)
  }, [])
  return (
    <div>
      <h3>Hello, {user.username}</h3>
      <p>You currently have {props.pantry.length} items in your pantry.</p>
    </div>

  )
}

/**
 * CONTAINER
 */
 const mapState = state => {
  return {
    user: state.auth,
    pantry: state.pantry
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPantry: (id) => dispatch(setPantryThunk(id))
})

export default connect(mapState, mapDispatchToProps)(Home)
