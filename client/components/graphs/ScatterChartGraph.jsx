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
  const {dataset, currentY, currentX, colors} = props
  return (
    <ScatterChart width={800} height={800}>
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
        dataset: state.dataset
    }
}

export default connect(mapState)(ScatterChartGraph)
