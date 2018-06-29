import axios from 'axios'

// ACTION TYPES
const SET_X_AXIS = 'SET_X_AXIS'
const ADD_Y_AXIS = 'ADD_Y_AXIS'
const DELETE_Y_AXIS = 'DELETE_Y_AXIS'
const FETCH_AND_SET_GRAPH = 'FETCH_AND_SET_GRAPH'
const RESET_GRAPH_SETTINGS = 'RESET_GRAPH_SETTINGS'

//INITIAL STATE
const graphSettings = {
  currentX: '',
  currentY: [],
  graphType: ''
}

//ACTION CREATORS
const setXAxisToStore = xAxis => ({type: SET_X_AXIS, xAxis})
const addYAxisToStore = (yAxis, idx) => ({type: ADD_Y_AXIS, yAxis, idx})
const deleteYAxisFromState = deletedYIdx => ({type: DELETE_Y_AXIS, deletedYIdx})
const fetchAndSetGraphFromDatabase = graph => ({
  type: FETCH_AND_SET_GRAPH,
  graph
})
const resetGraphSettingsState = () => ({type: RESET_GRAPH_SETTINGS})

// THUNK CREATORS
export const setXAxis = xAxis => dispatch => {
  dispatch(setXAxisToStore(xAxis))
}

export const addYAxis = (yAxis, idx) => dispatch => {
  dispatch(addYAxisToStore(yAxis, idx))
}

export const deleteYAxis = deletedYIdx => dispatch => {
  dispatch(deleteYAxisFromState(deletedYIdx))
}

export const fetchAndSetGraph = graphId => dispatch => {
  axios
    .get(`/api/graphs/${graphId}`)
    .then(res => dispatch(fetchAndSetGraphFromDatabase(res.data)))
}

export const resetGraphSettings = () => dispatch => {
  dispatch(resetGraphSettingsState())
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
    case FETCH_AND_SET_GRAPH:
      const {xAxis, yAxes, graphType} = action.graph
      const YAxisNames = yAxes.map(yAxis => yAxis.name)
      return {...state, currentX: xAxis, currentY: YAxisNames, graphType}
    case RESET_GRAPH_SETTINGS:
      return {...state, currentX: '', currentY: [], graphType: ''}
    default:
      return state
  }
}
