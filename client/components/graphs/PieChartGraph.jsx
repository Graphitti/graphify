import React from 'react'
import {connect} from 'react-redux'
import {PieChart, Pie, Tooltip, Legend} from 'recharts'

export const PieChartGraph = props => {
  const someData = [
    {name: 'A', value: 20},
    {name: 'B', value: 30},
    {name: 'C', value: 40}
  ]

  function quantityMaker(arr, term) {
    let quantityObj = {}
    arr.forEach(row => {
      let value = row[term]
      quantityObj[value] = quantityObj[value] + 1 || 1
    })
    let objArr = Object.keys(quantityObj).map(name => {
      return {
        name: name,
        value: quantityObj[name]
      }
    })
    return objArr
  }

  const {dataset, currentY, currentX, colors} = props

  return (
    <PieChart width={600} height={600}>
      <Pie
        isAnimationActive={true}
        data={quantityMaker(dataset, currentX)}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={60}
        fill={colors[0]}
      />
      {currentY.map((yAxis, idx) => (
        <Pie
          key={idx}
          isAnimationActive={true}
          data={quantityMaker(dataset, yAxis)}
          dataKey="value"
          cx={200}
          cy={200}
          innerRadius={60 + 10 + 30 * idx}
          outerRadius={70 + 20 + 30 * idx}
          fill={colors[idx + 1]}
          label
        />
      ))}
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

const mapState = state => {
  return {
    dataset: state.dataset
  }
}

export default connect(mapState)(PieChartGraph)
