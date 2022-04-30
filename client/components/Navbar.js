
import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { setPantryThunk } from '../store/pantry'

const Navbar = (props) => {
  useEffect(() => {
    if(props.auth){
    props.fetchPantry(props.auth.id)
  }},[])

return  (
  <div>
    <h1>FS-App-Template</h1>
    <nav>
      {props.isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to='/foodselection'>Food Stock</Link>
          <Link to='/pantry'>Pantry</Link>
          <a href="#" onClick={props.handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)
      }
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = (dispatch) => ({
  handleClick: () => dispatch(logout()),
  fetchPantry: (id) => dispatch(setPantryThunk(id)),

})

export default connect(mapState, mapDispatch)(Navbar)
