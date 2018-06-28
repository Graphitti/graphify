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

import { updateTitle, updateXAxisName, updateYAxisName } from '../store'


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
      }


    }

    render() {
      let graphType = 'Line'   // hardcode graph type now. After refactoring store state which could save user's favorie graph type, refactor this line later.
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
                <label>{`Choose color`}</label>
                  <select name='color' onChange={this.handleChange}>
                    <option value='#8884d8'><img width="20" height="25" src='https://www.colorhexa.com/8884d8.png' /></option>
                    <option value='#82ca9d'><img width="20" height="25" src='https://www.colorhexa.com/82ca9d.png'/></option>
                    <option value='#ffc658'><img width="20" height="25" src='https://www.colorhexa.com/ffc658.png' /></option>
                    <option value='#FF8042'><img width="20" height="25" src='https://www.colorhexa.com/ff8042.png' /></option>
                  </select>
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
  }
})

export default connect(mapState, mapDispatch)(SingleGraphView)
