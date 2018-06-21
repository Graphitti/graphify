import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import Dataset from './index'
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts'
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
    {name: 'richard', age: 34, grade: 100},
    {name: 'hello', age: 45, grade: 80},
    {name: 'world', age: 84, grade: 70}
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
        {this.state.uploadFile.length && <LineChart width={1000} height={1000} data={this.state.uploadFile}>
          <Line type="monotone" dataKey="age" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis dataKey="age" />
        </LineChart>}
      </div>
    )
  }
}
