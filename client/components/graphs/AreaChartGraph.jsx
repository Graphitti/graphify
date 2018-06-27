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
  const {dataset, graphSettings} = props
  const {currentX, currentY} = graphSettings
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  return (
    <AreaChart width={600} height={600} data={dataset}>
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
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(AreaChartGraph)
