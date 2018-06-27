import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import axios from 'axios'

const Navbar = ({handleClick, isLoggedIn, dataset}) => (
  <div>
    <Link to="/"><h1>GRAPHIFY</h1></Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
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
    <form onSubmit={ (event)=> {
      event.preventDefault();
      // axios.get('http://graphify-test.s3.amazonaws.com/test.csv')
      // // , {
      // //   Authorization: AWS
      // // })
      // .then(res => console.log(res))
      axios.get('/api/graphs/send')
      // axios.post('/api/graphs/send', {dataset: dataset})
      .then(res => console.log('#############',res.data))
    }
    }>
    <button type="submit">post test</button>
    </form>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    dataset: state.dataset
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
  isLoggedIn: PropTypes.bool.isRequired,
}
