import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import axios from 'axios'

const Navbar = ({handleClick, isLoggedIn}) => (
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
    {/* can use this for sending requests to aws with dummy data, delete in the future */}
    <form onSubmit={ (event)=> {
      event.preventDefault();
      // axios.post('/api/graphs/cat', {
      //   xAxis: 'hello', yAxis: ['hi', 'hello'], xAxisLabel: 'thelabel', 
      //   yAxisLabel: 'thislabel', title: 'tietle', graphType: 'line', shareable: true,
      // })
      axios.put('/api/graphs/cat', {
        xAxis: 'helloss', yAxis: ['hideff', 'hellotytyty', 'catts'], xAxisLabel: 'thelabel', 
        yAxisLabel: 'thislabelef', title: 'tietle', graphType: 'line'
      })
      // axios.get('/api/graphs/5558/aws')
      // axios.post('/api/graphs/5558/aws', {dataset: dataset})
      .then(res => console.log(res.data))
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
  isLoggedIn: PropTypes.bool.isRequired,
}
