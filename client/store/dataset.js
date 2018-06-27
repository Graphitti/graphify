import axios from 'axios'
import history from '../history'
import * as d3 from 'd3';
import { datasetColumnFormatter, uploadedDataFormatter } from './utils/datasetOrganizingFuncs';

/**
 * ACTION TYPES
 */
const SET_DATA = 'SET_DATA'
// const GET_DATA = 'GET_DATA'

/**
 * INITIAL STATE
 */
const defaultData = [];

/**
 * ACTION CREATORS
 */
const setData = data => ({ type: SET_DATA, data })
// const getData = data => ({type: GET_DATA, data})

/**
 * THUNK CREATORS
 */
export const uploadData = (data, fileName) => dispatch => {
    let processedData = uploadedDataFormatter(data);
    processedData.name = fileName;
    dispatch(setData(processedData))
    history.push('/graph-dataset')
}

export const getAsyncData = (domain, id, columnObj, datasetName) => dispatch => {
    return d3.csv(`https://${domain}/resource/${id}.csv`)
        .then(res => {
            let processedData = datasetColumnFormatter(res, columnObj);
            processedData.name = datasetName;
            console.log('Processed data', processedData);
            dispatch(setData(processedData))
            history.push('/graph-dataset');
        })
        .catch(console.error);
}

/**
 * REDUCER
 */
export default function (state = defaultData, action) {
    switch (action.type) {
        case SET_DATA:
            return action.data
        default:
            return state
    }
}
