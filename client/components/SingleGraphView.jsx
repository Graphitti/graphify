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


class SingleGraphView extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      let graphType = 'Bar'   // hardcode graph type now. After refactoring store state which could save user's favorie graph type, refactor this line later.
      return (
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
      )
    }
}


const mapState = state => {
  return {
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(SingleGraphView)
