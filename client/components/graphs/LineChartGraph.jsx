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
  const {dataset, currentY, currentX, colors, columnObj} = props
  return (
    <LineChart width={800} height={800} data={dataset}>
      {currentY.map((yAxis, idx) => (
        <Line key={idx} type="monotone" dataKey={yAxis} stroke={colors[idx]} />
      ))}
      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
      {columnObj[currentX].toLowerCase() !== 'number' ? (
        <XAxis
          dataKey={currentX}
          allowDuplicatedCategory={false}
          type="category"
        />
      ) : (
        <XAxis dataKey={currentX} allowDataOverflow={false} type="number" />
      )}
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset
  }
}

export default connect(mapState)(LineChartGraph)
