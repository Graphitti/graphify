import React from 'react'
import {connect} from 'react-redux'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

export const BarChartGraph = props => {
  const {dataset, graphSettings} = props
  const {currentX, currentY} = graphSettings
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  return (
    <BarChart width={600} height={600} data={dataset}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={currentX} />
      <YAxis allowDuplicatedCategory="false" />
      <Tooltip />
      <Legend />
      {currentY.map((yAxis, idx) => (
        <Bar
          key={idx}
          type="monotone"
          dataKey={yAxis}
          fillOpacity={0.6}
          fill={colors[idx]}
        />
      ))}
    </BarChart>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(BarChartGraph)
