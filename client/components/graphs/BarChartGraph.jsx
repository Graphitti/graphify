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
    <BarChart width={800} height={800} data={dataset}>
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
        <Bar key={idx} type="monotone" dataKey={yAxis} fill={colors[idx]} />
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
