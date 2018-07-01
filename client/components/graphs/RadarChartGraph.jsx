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
  const {currentX, currentY, title, xAxisName, yAxisName, colors} = graphSettings

  return (
    <div className="graph-dataset-graphs-single">
      <h3>{title || 'Radar Chart'}</h3>
      <RadarChart
        cx={300}
        cy={300}
        outerRadius={250}
        width={600}
        height={600}
        data={dataset.dataset}
      >
        <Tooltip />
        <Legend align='center'/>
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
    </div>
  )
}

const mapState = state => ({
    dataset: state.dataset,
    graphSettings: state.graphSettings
  })

export default connect(mapState)(RadarChartGraph)
