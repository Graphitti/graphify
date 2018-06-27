import React from 'react'
import {connect} from 'react-redux'
import {
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  Tooltip,
  Legend
} from 'recharts'

export const RadarChartGraph = props => {
  const {dataset, graphSettings} = props
  const {currentX, currentY} = graphSettings
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
  return (
    <RadarChart
      cx={300}
      cy={300}
      outerRadius={250}
      width={600}
      height={600}
      data={dataset}
    >
      <Tooltip />
      <Legend />
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
  )
}

const mapState = state => {
  return {
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(RadarChartGraph)
