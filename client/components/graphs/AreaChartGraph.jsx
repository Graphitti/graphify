import React from 'react'
import {connect} from 'react-redux'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export const AreaChartGraph = props => {
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
      <h2>{title || 'Area Chart'}</h2>
      <ResponsiveContainer width="85%" height={550}>
        <AreaChart data={dataset.dataset}>
          <CartesianGrid strokeDasharray="3 3" />
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
          <YAxis
            label={{value: `${yAxisName}`, angle: -90, position: 'insideLeft'}}
          />
          <Tooltip />
          <Legend align="center" />
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

export default connect(mapState)(AreaChartGraph)
