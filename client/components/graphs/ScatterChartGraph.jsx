import React from 'react'
import {connect} from 'react-redux'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

export const ScatterChartGraph = props => {
  const {dataset, graphSettings} = props
  const {currentX, currentY, title, xAxisName, yAxisName, colors} = graphSettings

  return (
    <div>
      <h4>{title}</h4>
      <ScatterChart width={600} height={600}>
        <CartesianGrid />
        <XAxis dataKey={currentX} type="number" label={{value:`${xAxisName}`, offset:-20, position:"insideBottom"}} />
        {currentY.length && currentY.map((yAxis, idx) =>(
          <YAxis yAxisId={idx} key={idx} dataKey={yAxis} type="number" label={{value:`${yAxisName}`, angle:-90, position:"insideLeft"}} />
        ))}
        <Tooltip cursor={{strokeDasharray: '3 3'}} />
        <Legend align='right'/>
        {currentY.length && currentY.map((yAxis, idx) =>(
          <Scatter yAxisId={idx} key={idx} name={yAxis} data={dataset} fill={colors[idx]} />
        ))}
      </ScatterChart>
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
