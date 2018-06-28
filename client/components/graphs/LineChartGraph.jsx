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
  const {currentX, currentY, title, xAxisName, yAxisName} = graphSettings
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  return (
    <div>
      <h4>{title}</h4>
      <LineChart width={600} height={600} data={dataset}>
        {currentY.map((yAxis, idx) => (
          <Line key={idx} type="monotone" dataKey={yAxis} stroke={colors[idx]} />
        ))}
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey={currentX} label={{value:`${xAxisName}`, offset:-20, position:"insideBottom"}}/>
        <YAxis label={{value:`${yAxisName}`, angle:-90, position:"insideLeft"}}/>
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(LineChartGraph)
