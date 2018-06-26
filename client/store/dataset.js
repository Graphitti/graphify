import axios from 'axios'
import history from '../history'
import * as d3 from 'd3';
import { setSearchStore, setUploadStore } from './datasetFuncs';

/**
 * ACTION TYPES
 */
const SET_DATA = 'SET_DATA'
const GET_DATA = 'GET_DATA'

/**
 * INITIAL STATE
 */
const defaultData = []

/**
 * ACTION CREATORS
 */
const setData = data => ({type: SET_DATA, data})
const getData = data => ({type: GET_DATA, data})

/**
 * THUNK CREATORS
 */
//getDataFromUpload
export const uploadData = data => dispatch => {
    let processedData = setUploadStore(data);
    dispatch(setData(processedData));
}

//getDataFromSoda 
export const fetchData = (domain, id, columnObj) => dispatch => {
    return d3.csv(`https://${domain}/resource/${id}.csv`)
    .then(res => {
        let processedData = setSearchStore(res, columnObj);
        dispatch(setData(processedData));
    })
    .catch(console.error);
}

/**
 * REDUCER
 */
export default function(state = defaultData, action) {
  switch (action.type) {
    case SET_DATA:
      return action.data
    default:
      return state
  }
}
