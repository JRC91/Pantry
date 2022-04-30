import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3>Hello, {username}</h3>
      <p>You currently have {props.pantry.length} items in your pantry.</p>
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    pantry: state.pantry
  }
}

export default connect(mapState)(Home)
