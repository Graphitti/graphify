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
import {fetchAndSetGraph, fetchAndSetDataFromS3} from '../store'

class SingleGraphView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {graphId} = this.props.match.params
    this.props.getGraphId(graphId)
    this.props.getDataset(graphId)
  }

  render() {
    let {graphType} = this.props.graphSettings
    return (
      <div>
        {(function() {
          switch (graphType) {
            case 'Line':
              return <LineChartGraph animationDuration={1500} />
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
    )
  }
}

const mapState = state => {
  return {
    graphSettings: state.graphSettings
  }
}

const mapDispatch = dispatch => ({
  getGraphId: graphid => {
    dispatch(fetchAndSetGraph(graphid))
  },
  getDataset: graphId => {
    dispatch(fetchAndSetDataFromS3(graphId))
  }
})

export default connect(mapState, mapDispatch)(SingleGraphView)
