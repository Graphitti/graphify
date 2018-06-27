import React from 'react'
import {connect} from 'react-redux'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

export const ScatterChartGraph = props => {
  const {dataset, graphSettings} = props
  const {currentX, currentY} = graphSettings
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  return (
    <ScatterChart width={600} height={600}>
      <CartesianGrid />
      <XAxis dataKey={currentX} type="number" />
      <YAxis dataKey={currentY[0]} type="number" />
      <Scatter data={dataset} fill={colors[0]} />
      <Tooltip cursor={{strokeDasharray: '3 3'}} />
      <Legend />
    </ScatterChart>
  )
}

const mapState = state => {
    return {
        dataset: state.dataset,
        graphSettings: state.graphSettings
    }
}

export default connect(mapState)(ScatterChartGraph)
