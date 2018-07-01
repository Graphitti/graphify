import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="auth">
      <div id="auth-info">
        <img id="auth-info-img" src="/graph-icon.png" />
        <h1 id="auth-info-title">{displayName}</h1>
        <form id="auth-form" onSubmit={handleSubmit} name={name}>
          <div>
            <input
              autoFocus="autofocus"
              className="auth-form-input"
              placeholder="email"
              name="email"
              type="text"
            />
          </div>
          <div>
            <input
              className="auth-form-input"
              placeholder="password"
              name="password"
              type="password"
            />
          </div>
          <button id="auth-form-button" type="submit">
            {displayName}
          </button>

          <h3 id="auth-form-or">or</h3>
          <a href="/auth/google">
            <img id="auth-form-google" src="google-icon.png" />
          </a>
        </form>
        {error &&
          error.response && (
            <div>
              <h3 id="auth-form-error">{error.response.data}</h3>{' '}
            </div>
          )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
