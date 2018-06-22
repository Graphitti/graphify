import axios from 'axios'
import history from '../history'
import * as d3 from 'd3';
import { setSearchStore, setUploadStore } from './datasetFuncs';

/**
 * ACTION TYPES
 */
const SET_DATA = 'SET_DATA'
const GET_DATA = 'GET_DATA'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultData = []

/**
 * ACTION CREATORS
 */
const setData = data => ({type: SET_DATA, data})
const getData = data => ({type: GET_DATA, data})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const uploadData = data => dispatch => {
    let processedData = setUploadStore(data);
    dispatch(setData(processedData));
}

export const fetchData = (domain, id, columnObj) => dispatch => {
    return d3.csv(`https://${domain}/resource/${id}.csv`)
    // axios.get(`/api/soda?id=${result.resource.id}&domain=${result.metadata.domain}`)
    .then(res => {
        let processedData = setSearchStore(res, columnObj);
        dispatch(setData(processedData));
    })
    .catch(console.error);
}
// export const auth = (email, password, method) => async dispatch => {
//   let res
//   try {
//     res = await axios.post(`/auth/${method}`, {email, password})
//   } catch (authError) {
//     return dispatch(getUser({error: authError}))
//   }

//   try {
//     dispatch(getUser(res.data))
//     history.push('/home')
//   } catch (dispatchOrHistoryErr) {
//     console.error(dispatchOrHistoryErr)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeUser())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultData, action) {
  switch (action.type) {
    case SET_DATA:
      return action.data
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
