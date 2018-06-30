import axios from 'axios'
import history from '../history'
import * as d3 from 'd3'
import {
  datasetColumnFormatter,
  uploadedDataFormatter
} from './utils/datasetOrganizingFuncs'

/**
 * ACTION TYPES
 */
const SET_DATA = 'SET_DATA'

/**
 * INITIAL STATE
 */
const defaultData = {
  dataset: [],
  columnObj: {},
  name: '' 
}

/**
 * ACTION CREATORS
 */
export const setData = data => ({type: SET_DATA, data})

/**
 * THUNK CREATORS
 */
export const uploadData = (data, fileName) => dispatch => {
  let processedData = uploadedDataFormatter(data)
  processedData.name = fileName
  dispatch(setData(processedData))
  history.push('/graph-dataset')
}

export const getAsyncData = (domain, id, columnObj, datasetName) => dispatch => {
  return d3
    .csv(`https://${domain}/resource/${id}.csv`)
    .then(res => {
      let processedData = datasetColumnFormatter(res, columnObj)
      processedData.name = datasetName
      dispatch(setData(processedData))
      history.push('/graph-dataset')
    })
    .catch(console.error)
}

export const fetchAndSetDataFromS3 = awsId => dispatch => {
  axios.get(`/api/graphs/aws/${awsId}`).then(res => {
    const {dataset} = res.data
    dispatch(setData(dataset))
  })
  .catch(console.error)
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
