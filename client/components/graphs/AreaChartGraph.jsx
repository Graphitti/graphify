import React from 'react'
import {connect} from 'react-redux'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

export const AreaChartGraph = props => {
  const {dataset, graphSettings} = props
  const {currentX, currentY, title, xAxisName, yAxisName, colors} = graphSettings

  return (
    <div>
      <h4>{title}</h4>
      <AreaChart width={600} height={600} data={dataset}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={currentX} label={{value:`${xAxisName}`, offset:-20, position:"insideBottom"}} />
        <YAxis label={{value:`${yAxisName}`, angle:-90, position:"insideLeft"}} />
        <Tooltip />
        <Legend align='right'/>
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
