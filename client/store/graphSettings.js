// ACTION TYPES
const SET_X_AXIS = 'SET_X_AXIS'
const ADD_Y_AXIS = 'ADD_Y_AXIS'
const DELETE_Y_AXIS = 'DELETE_Y_AXIS'

//INITIAL STATE
const graphSettings = {
  currentX: '',
  currentY: [],
  yCategQuantity: ['']
}

//ACTION CREATORS
const setXAxisToStore = xAxis => ({type: SET_X_AXIS, xAxis})
const addYAxisToStore = (yAxis, idx) => ({type: ADD_Y_AXIS, yAxis, idx})
const deleteYAxisFromState = deletedYIdx => ({type: DELETE_Y_AXIS, deletedYIdx})

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
      const yAxisDeleted = [...state.currentY].filter((y, i) => i !== action.deletedYIdx)    
      return {...state, currentY: yAxisDeleted}
    default:
      return state
  }
}
