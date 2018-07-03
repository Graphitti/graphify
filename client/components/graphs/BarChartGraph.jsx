import React from 'react'
import {connect} from 'react-redux'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export const BarChartGraph = props => {
  const {dataset, graphSettings} = props
  const {
    currentX,
    currentY,
    title,
    xAxisName,
    yAxisName,
    colors
  } = graphSettings
  return (
    <div className="graph-dataset-graphs-single">
      <h2>{title || 'Bar Chart'}</h2>
      <ResponsiveContainer width="90%" height={550}>
        <BarChart align="center" data={dataset.dataset}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            label={{
              value: `${yAxisName}`,
              angle: -90,
              position: 'insideLeft'
            }}
          />
          <Tooltip />
          {xAxisName ? (
            <XAxis
              dataKey={currentX}
              label={{
                value: `${xAxisName}`,
                offset: -15,
                position: 'insideBottom'
              }}
            />
          ) : (
            <div />
          )}

          {xAxisName ? <Legend align="right" /> : <Legend align="center" />}

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
      </ResponsiveContainer>
    </div>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(BarChartGraph)
