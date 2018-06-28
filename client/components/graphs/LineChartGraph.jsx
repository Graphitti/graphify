import React from 'react'
import {connect} from 'react-redux'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

export const LineChartGraph = props => {
  const {dataset, graphSettings} = props
  const {currentX, currentY} = graphSettings
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  console.log('I hit this ---->>>>>', props);
  return (
    <LineChart width={600} height={600} data={dataset}>
      {currentY.map((yAxis, idx) => (
        <Line key={idx} type="monotone" dataKey={yAxis} stroke={colors[idx]} />
      ))}
      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
      <XAxis dataKey={currentX} />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(LineChartGraph)
