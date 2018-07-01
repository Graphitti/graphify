import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  LineChartGraph,
  BarChartGraph,
  AreaChartGraph,
  RadarChartGraph,
  ScatterChartGraph,
  PieChartGraph
} from './graphs'

import {
  updateTitle,
  updateXAxisName,
  updateYAxisName,
  updateColor,
  fetchAndSetGraph,
  fetchAndSetDataFromS3
} from '../store'
import {HuePicker} from 'react-color'


class SingleGraphView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      legend: -1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
  }

  componentDidMount() {
    const {graphId} = this.props.match.params
    const {getGraphId} = this.props
    getGraphId(graphId)
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    switch (name) {
      case 'title':
        return this.props.changeTitle(value)
      case 'XAxis':
        return this.props.changeXAxisName(value)
      case 'YAxis':
        return this.props.changeYAxisName(value)
    }
  }

  handleClick(idx) {
    this.setState({legend: idx})
  }

  handleChangeColor(color) {
    this.props.changeColor(color.hex, this.state.legend)
    this.setState({legend: -1})
  }

  render() {
    let {currentY, graphType, colors} = this.props.graphSettings

    return (
      <div>
        <div>
          {(function() {
            switch (graphType) {
              case 'Line':
                return <LineChartGraph />
              case 'Bar':
                return <BarChartGraph />
              case 'Area':
                return <AreaChartGraph />
              case 'Radar':
                return <RadarChartGraph />
              case 'Scatter':
                return <ScatterChartGraph />
              case 'Pie':
                return <PieChartGraph />
              default:
                return null
            }
          })()}
        </div>

        <div>
            <form>
              <label>{`Change title`}</label>
                <input type='text' name='title' onChange={this.handleChange}/>
              <label>{`Change the name of X axis`}</label>
                <input type='text' name='XAxis' onChange={this.handleChange}/>
              <label>{`Change the name of Y axis`}</label>
                <input type='text' name='YAxis' onChange={this.handleChange}/>
            </form>
            <div>
              {currentY.map((yAxis, idx) => (
                <div key={idx}>
                  <label>{`Change the color of the legend of '${yAxis}'`}</label>
                  <button onClick={ () => this.handleClick(idx) }>Pick Color</button>
                  { this.state.legend !== -1 ? <div className="popover" >
                    <div className="cover" onClick={ this.handleClose }/>
                    <HuePicker
                    color={ colors[idx] }
                    onChangeComplete={this.handleChangeColor }
                    />
                  </div> : null }
                </div>
              ))}
            </div>
        </div>
      </div>
    )}
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
  changeColor(color, idx) {
    dispatch(updateColor(color, idx))
  },
  getGraphId: graphid => {
    dispatch(fetchAndSetGraph(graphid))
  },
  getDataset: graphId => {
    dispatch(fetchAndSetDataFromS3(graphId))
  }
})

export default connect(mapState, mapDispatch)(SingleGraphView)