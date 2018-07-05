import {RSA_SSLV23_PADDING} from 'constants'

import {puts} from 'util'

import axios from 'axios'
import {setData} from './dataset'

// ACTION TYPES
const SET_X_AXIS = 'SET_X_AXIS'
const ADD_Y_AXIS = 'ADD_Y_AXIS'
const DELETE_Y_AXIS = 'DELETE_Y_AXIS'
const FETCH_AND_SET_GRAPH = 'FETCH_AND_SET_GRAPH'
const RESET_GRAPH_SETTINGS = 'RESET_GRAPH_SETTINGS'

const UPDATE_TITLE = 'UPDATE_TITLE'
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
const UPDATE_XAXIS_NAME = 'UPDATE_XAXIS_NAME'
const UPDATE_YAXIS_NAME = 'UPDATE_YAXIS_NAME'
const UPDATE_COLOR = 'UPDATE_COLOR'

//INITIAL STATE
const graphSettings = {
  currentX: '',
  currentY: [],
  title: '',
  description: '',
  xAxisName: '',
  yAxisName: '',
  colors: ['#8884d8', '#82ca9d', '#ffc658', '#FF8042'],
  graphType: ''
}

//ACTION CREATORS
export const setXAxis = xAxis => ({type: SET_X_AXIS, xAxis})
export const addYAxis = (yAxis, idx) => ({type: ADD_Y_AXIS, yAxis, idx})
export const deleteYAxis = deletedYIdx => ({type: DELETE_Y_AXIS, deletedYIdx})
const fetchAndSetGraphFromDatabase = graph => ({
  type: FETCH_AND_SET_GRAPH,
  graph
})
export const resetGraphSettings = () => ({type: RESET_GRAPH_SETTINGS})

export const updateTitle = title => ({type: UPDATE_TITLE, title})
export const updateDescription = description => ({
  type: UPDATE_DESCRIPTION,
  description
})
export const updateXAxisName = name => ({type: UPDATE_XAXIS_NAME, name})
export const updateYAxisName = name => ({type: UPDATE_YAXIS_NAME, name})
export const updateColor = (color, idx) => ({type: UPDATE_COLOR, color, idx})

// THUNK CREATORS
export const fetchAndSetGraph = graphId => dispatch => {
  return axios
    .get(`/api/graphs/${graphId}`)
    .then(res => {
      dispatch(fetchAndSetGraphFromDatabase(res.data.graph))
      dispatch(setData(res.data.dataset.dataset))
    })
    .catch(err => console.log(err))
}

export const saveGraphSettingToDB = (graphId, settings) => dispatch => {
  const {
    currentX,
    currentY,
    xAxisName,
    yAxisName,
    title,
    graphType,
    colors,
    description
  } = settings
  axios
    .put(`/api/graphs/${graphId}`, {
      xAxis: currentX,
      yAxis: currentY,
      xAxisLabel: xAxisName,
      yAxisLabel: yAxisName,
      title,
      graphType,
      description,
      colors
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

// REDUCER

export default (state = graphSettings, action) => {
  switch (action.type) {
    case SET_X_AXIS:
      return {...state, currentX: action.xAxis}
    case ADD_Y_AXIS:
      const newCurrentY = [...state.currentY]
      newCurrentY[action.idx] = action.yAxis
      return {...state, currentY: newCurrentY}
    case DELETE_Y_AXIS:
      const yAxisDeleted = [...state.currentY].filter(
        (y, i) => i !== action.deletedYIdx
      )
      return {...state, currentY: yAxisDeleted}
    case UPDATE_TITLE:
      return {...state, title: action.title}
    case UPDATE_DESCRIPTION:
      return {...state, description: action.description}
    case UPDATE_XAXIS_NAME:
      return {...state, xAxisName: action.name}
    case UPDATE_YAXIS_NAME:
      return {...state, yAxisName: action.name}
    case UPDATE_COLOR:
      const newColors = state.colors.map((color, index) => {
        if (index === action.idx) return action.color
        else return color
      })
      return {...state, colors: newColors}
    case FETCH_AND_SET_GRAPH:
      const {
        xAxis,
        yAxes,
        graphType,
        xAxisLabel,
        yAxisLabel,
        title,
        colors,
        description
      } = action.graph
      const YAxisNames = yAxes.map(yAxis => yAxis.name)
      return {
        ...state,
        currentX: xAxis,
        currentY: YAxisNames,
        xAxisName: xAxisLabel,
        yAxisName: yAxisLabel,
        graphType,
        title,
        description,
        colors
      }
    case RESET_GRAPH_SETTINGS:
      return {
        ...state,
        currentX: '',
        currentY: [],
        graphType: '',
        title: '',
        xAxisName: '',
        yAxisName: '',
        colors: ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
      }
    default:
      return state
  }
}
