import React from 'react'
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts'
import {connect} from 'react-redux'

const Dataset = props => {
  // const data = [
  //   {name: 'richard', age: 34, grade: 100},
  //   {name: 'hello', age: 45, grade: 80},
  //   {name: 'world', age: 84, grade: 70}
  // ]
  const data = props.data
  console.log("DATA", props)
  return (
    <div>
      <h1>Chart</h1>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="age" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis dataKey="age" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis dataKey="grade" />
      </LineChart>
    </div>
  )
}
export default Dataset
