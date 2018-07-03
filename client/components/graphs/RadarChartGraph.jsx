import React from 'react'
import {connect} from 'react-redux'
import {
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export const RadarChartGraph = props => {
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
      <h2>{title || 'Radar Chart'}</h2>
      <ResponsiveContainer width="95%" height={550}>
        <RadarChart cx={250} cy={250} outerRadius={200} data={dataset.dataset}>
          <Tooltip />
          <Legend align="center" />
          <PolarGrid />
          <PolarAngleAxis dataKey={currentX} />
          <PolarRadiusAxis />
          {currentY.map((yAxis, idx) => (
            <Radar
              key={idx}
              name={yAxis}
              dataKey={yAxis}
              stroke={colors[idx]}
              fill={colors[idx]}
              fillOpacity={0.6}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

const mapState = state => ({
  dataset: state.dataset,
  graphSettings: state.graphSettings
})

export default connect(mapState)(RadarChartGraph)
