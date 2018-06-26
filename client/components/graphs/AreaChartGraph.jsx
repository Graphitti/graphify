import React from 'react'
import {connect} from 'react-redux'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

export const AreaChartGraph = props => {
  const {dataset, currentY, currentX, colors} = props

  return (
    <AreaChart width={800} height={800} data={dataset}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={currentX} />
      <YAxis />
      <Tooltip />
      <Legend />
      {currentY.map((yAxis, idx) => (
        <Area
          key={idx}
          type="monotone"
          dataKey={yAxis}
          stroke={colors[idx]}
          fill={colors[idx]}
        />
      ))}
    </AreaChart>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset
  }
}

export default connect(mapState)(AreaChartGraph)
