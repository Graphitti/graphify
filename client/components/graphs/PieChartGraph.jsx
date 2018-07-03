import React from 'react'
import {connect} from 'react-redux'
import {PieChart, Pie, Tooltip, Legend, ResponsiveContainer} from 'recharts'

export const PieChartGraph = props => {
  function quantityMaker(arr, term) {
    let quantityObj = {}
    arr.forEach(row => {
      let value = row[term]
      quantityObj[value] = quantityObj[value] + 1 || 1
    })
    let objArr = Object.keys(quantityObj).map(name => {
      return {
        name: name,
        value: Math.round(quantityObj[name] * 100 / arr.length)
      }
    })
    return objArr
  }

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
    <div>
      <h2>{title}</h2>
      <ResponsiveContainer width="90%" height={550}>
        <PieChart>
          <Pie
            isAnimationActive={true}
            data={quantityMaker(dataset.dataset, currentX)}
            dataKey="value"
            cx={300}
            cy={300}
            innerRadius={150}
            // outerRadius={150}
            fill={colors[0]}
            label
          />
          <Tooltip />
        </PieChart>
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

export default connect(mapState)(PieChartGraph)
