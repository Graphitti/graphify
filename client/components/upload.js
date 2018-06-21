import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import Dataset from './index'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar} from 'recharts'
// import "../../public/styles.css";

export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadFile: []
    }
    this.handleForce = this.handleForce.bind(this)
  }

  handleForce = data => {
    // console.log(data);
    let objArr = []
    let headers = data[0]

    for (let j = 1; j < data.length; j++) {
      let obj = {}
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = isNaN(+(data[j][i])) ? data[j][i] : Number(data[j][i])
      }
      objArr.push(obj)
    }
    this.setState({uploadFile: objArr})
    // this.props.history.push('/dataset')
  }

  render() {
      const data = [
    {name: 'richard', age: 34, grade: 100, expenses: 150},
    {name: 'hello', age: 45, grade: 80, expenses: 200},
    {name: 'world', age: 84, grade: 70, expenses: 120}
  ]
    console.log(this.state.uploadFile)
    return (
      <div className="container">
        {console.log('upload ......')}
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={this.handleForce}
        />
        <p>and then open the console</p>
        <h1>Chart</h1>
        <LineChart width={1000} height={1000} data={data}>
          <Line type="monotone" dataKey="age" stroke="#8884d8" />
          <Line type="monotone" dataKey="grade" stroke="#82ca9d" />
          <Line type="monotone" dataKey="expenses" stroke="#e22dd6" />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis dataKey="expenses" />
          <Tooltip />
          <Legend />
        </LineChart>

        <BarChart width={1000} height={1000} data={data}>
          <Bar type="monotone" dataKey="age" fill="#8884d8" />
          <Bar type="monotone" dataKey="grade" fill="#82ca9d" />
          <Bar type="monotone" dataKey="expenses" fill="#e22dd6" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="expenses" />
          <Tooltip />
          <Legend />
        </BarChart>
      </div>
    )
  }
}


