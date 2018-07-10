import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_TOASTS = 'SET_TOASTS'
const RESET_TOASTS = 'RESET_TOASTS'

/**
 * INITIAL STATE
 */
const defaultToast = {
    graph: false,
    datset: false
}

/**
 * ACTION CREATORS
 */
export const setToast = toasts => ({type: SET_TOASTS, toasts})
export const resetToast = () => ({type: RESET_TOASTS})

/**
 * THUNK CREATORS
 */
export const toastResetter = () => dispatch => {
  dispatch(resetToast())
}

/**
 * REDUCER
 */
export default function(state = defaultToast, action) {
  switch (action.type) {
    case SET_TOASTS:
      return action.toasts
    case RESET_TOASTS:
        return defaultToast
    default:
      return state
  }
}
