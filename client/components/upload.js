import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import Dataset from './index'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts'
// import "../../public/styles.css";

export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadFile: [],
      currentX: ""
    }
    this.handleUpload = this.handleUpload.bind(this)
    this.handleXCategory = this.handleXCategory.bind(this)
  }

  handleUpload = data => {
    console.log('DATA', data)
    let objArr = []
    let headers = data[0]

    for (let j = 1; j < data.length; j++) {
      let obj = {}
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = isNaN(+data[j][i]) ? data[j][i] : Number(data[j][i])
      }
      objArr.push(obj)
    }
    this.setState({uploadFile: objArr})
    // this.props.history.push('/dataset')
  }

  handleXCategory = event => {
    this.setState({currentX: event.target.value})
  }

  render() {
    // const data = [
    //   {name: 'richard', age: 34, grade: 100, expenses: 150},
    //   {name: 'hello', age: 45, grade: 80, expenses: 200},
    //   {name: 'world', age: 84, grade: 70, expenses: 120}
    // ]
    const data = this.state.uploadFile
    const xAxis = []
    for (let k in data[0]) {
      if (typeof data[0][k] === 'string') xAxis.push(k)
    }
    console.log("DATASET", this.state.uploadFile)
    console.log("CATEGORY", this.state.currentX)
    return (
      <div className="container">
        {console.log('upload ......')}
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={this.handleUpload}
        />
        <h1>Chart</h1>
        {data.length && (
          <div>
            <h3>choose x and y please</h3>
            <form>
              <select onChange={this.handleXCategory}>
                {xAxis.map(xCategory => <option key={xCategory}>{xCategory}</option>)}
              </select>
            </form>{' '}
            <LineChart width={1000} height={1000} data={data}>
              <Line type="monotone" dataKey="age" stroke="#8884d8" />
              <Line type="monotone" dataKey="grade" stroke="#82ca9d" />
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey={this.state.currentX} />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
            <BarChart width={1000} height={1000} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={this.state.currentX} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar type="monotone" dataKey="age" fill="#8884d8" />
              <Bar type="monotone" dataKey="grade" fill="#82ca9d" />
            </BarChart>
          </div>
        )}
      </div>
    )
  }
}
