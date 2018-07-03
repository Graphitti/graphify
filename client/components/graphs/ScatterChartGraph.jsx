import React from 'react'
import {connect} from 'react-redux'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export const ScatterChartGraph = props => {
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
      <h2>{title || 'Scatter Chart'}</h2>
      <ResponsiveContainer width="85%" height={550}>
        <ScatterChart>
          <CartesianGrid />
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
          />
          {currentY.length &&
            currentY.map((yAxis, idx) => (
              <YAxis
                yAxisId={idx}
                key={idx}
                dataKey={yAxis}
                type="number"
                label={{
                  value: `${yAxisName}`,
                  angle: -90,
                  position: 'insideLeft'
                }}
              />
            ))}
          <Tooltip cursor={{strokeDasharray: '3 3'}} />
          <Legend align="center" />
          {currentY.length &&
            currentY.map((yAxis, idx) => (
              <Scatter
                yAxisId={idx}
                key={idx}
                name={yAxis}
                data={dataset.dataset}
                fill={colors[idx]}
              />
            ))}
        </ScatterChart>
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

export default connect(mapState)(ScatterChartGraph)
