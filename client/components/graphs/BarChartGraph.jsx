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
  const {dataset, currentY, currentX, colors, columnObj} = props
  return (
    <BarChart width={600} height={600} data={dataset}>
      <CartesianGrid strokeDasharray="3 3" />
      {columnObj[currentX].toLowerCase !== 'number' ? (
        <XAxis
          dataKey={currentX}
          allowDuplicatedCategory={false}
          type="category"
        />
      ) : (
        <XAxis dataKey={currentX} />
      )}
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
    dataset: state.dataset
  }
}

export default connect(mapState)(BarChartGraph)
