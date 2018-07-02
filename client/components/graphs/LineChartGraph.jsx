import React from 'react'
import {connect} from 'react-redux'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'


export const LineChartGraph = props => {
  const {dataset, graphSettings} = props
  const {currentX, currentY, title, xAxisName, yAxisName, colors} = graphSettings

  return (
    <div className="graph-dataset-graphs-single">
      <h3>{title || 'Line Chart'}</h3>
      <LineChart width={600} height={600} data={dataset.dataset}>
        {currentY.length && currentY.map((yAxis, idx) => (
          <Line key={idx} type="monotone" dataKey={yAxis} stroke={colors[idx]} />
        ))}
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        {
          currentX.toLowerCase() !== 'number' ?
            <XAxis dataKey={currentX} label={{value:`${xAxisName}`, offset:-20, position:"insideBottom"}} allowDuplicatedCategory={false} type="category"/>
          :
            <XAxis dataKey={currentX} label={{value:`${xAxisName}`, offset:-20, position:"insideBottom"}} allowDataOverflow={false} type="number" />
        }
        <YAxis label={{value:`${yAxisName}`, angle:-90, position:"insideLeft"}}/>
        <Tooltip />
        <Legend align='center'/>
        <Text style={{fontSize:3}} width={100} textAnchor="middle" scaleToFit={true}>
          <tspan>what a wonderful day</tspan>
        </Text>
        </LineChart>
    </div>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

export default connect(mapState)(LineChartGraph)
