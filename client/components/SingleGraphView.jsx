import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LineChartGraph,
  BarChartGraph,
  AreaChartGraph,
  RadarChartGraph,
  ScatterChartGraph,
  PieChartGraph
} from './graphs'

import { updateTitle, updateXAxisName, updateYAxisName, changeColor } from '../store'
import { TwitterPicker } from 'react-color'

class SingleGraphView extends Component {
    constructor(props) {
      super(props)

      this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
      const name = event.target.name
      const value = event.target.value
      switch(name) {
        case 'title':
          return this.props.changeTitle(value)
        case 'XAxis':
          return this.props.changeXAxisName(value)
        case 'YAxis':
          return this.props.changeYAxisName(value)
        case 'color':
          return this.props.changeColor(value)
      }


    }

    render() {
      const { currentY } = this.props.graphSettings
      const graphType = 'Line'   // hardcode graph type now. After refactoring store state which could save user's favorie graph type, refactor this line later.
      return (
        <div>
          <div>
              {(function() {
                  switch(graphType) {
                      case 'Line':
                          return <LineChartGraph />;
                      case 'Bar':
                          return <BarChartGraph />;
                      case 'Area':
                          return <AreaChartGraph />;
                      case 'Radar':
                          return <RadarChartGraph />;
                      case 'Scatter':
                          return <ScatterChartGraph />;
                      case 'Pie':
                          return <PieChartGraph />;
                      default:
                          return null;
                  }
              })()}
          </div>

          <div>
              <form>
                <label>{`Change title`}</label>
                  <input type='text' name='title' onChange={this.handleChange}/>
              {/*  {currentY.map((yAxis, idx) => (

                ))} */}
                <label>{`Change the name of X axis`}</label>
                  <input type='text' name='XAxis' onChange={this.handleChange}/>
                <label>{`Change the name of Y axis`}</label>
                  <input type='text' name='YAxis' onChange={this.handleChange}/>
              </form>
          </div>

        </div>
      )
    }
}


const mapState = state => {
  return {
    graphSettings: state.graphSettings
  }
}

const mapDispatch = dispatch => ({
  changeTitle(title) {
    dispatch(updateTitle(title))
  },
  changeXAxisName(name) {
    dispatch(updateXAxisName(name))
  },
  changeYAxisName(name) {
    dispatch(updateYAxisName(name))
  },
  changeColor(color) {
    dispatch(updateColor(color))
  }
})

export default connect(mapState, mapDispatch)(SingleGraphView)
