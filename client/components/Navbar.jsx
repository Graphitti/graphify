import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <div>
      <img id="navbar-img" src="/graph-icon.png" />
      <Link to="/">
        <h1 id="navbar-name">GRAPHIFY</h1>
      </Link>
    </div>
    <nav id="navbar-options">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link className="navbar-options-buttons" to="/profile">
            My Account
          </Link>
          <a className="navbar-options-buttons" href="/" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="navbar-options-buttons" to="/login">
            Login
          </Link>
          <Link className="navbar-options-buttons" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
