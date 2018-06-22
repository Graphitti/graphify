import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
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
      currentX: '',
      currentY: [],
      showGraph: false
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

  handleYCategory = event => {
    this.setState({currentY: event.target.value})
  }

  render() {
    const data = this.state.uploadFile
    const xAxis = []
    const yAxis = []
    for (let k in data[0]) {
      if (typeof data[0][k] === 'string') xAxis.push(k)
      else yAxis.push(k)
    }
    console.log('DATASET', this.state.uploadFile)
    console.log('CATEGORY', this.state.currentX)
    return (
      <div className="container">
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
                <option hidden>choose X</option>
                {xAxis.map(xCategory => (
                  <option key={xCategory}>{xCategory}</option>
                ))}
              </select>
              <select onChange={this.handleYCategory}>
                <option hidden>choose Y</option>
                {yAxis.map(yCategory => (
                  <option key={yCategory}>{yCategory}</option>
                ))}
              </select>
            </form>
            {(this.state.currentX && this.state.currentY.length) && (
              <div>
                <LineChart width={1000} height={1000} data={data}>
                  <Line
                    type="monotone"
                    dataKey={this.state.currentY}
                    stroke="#8884d8"
                  />
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
                  <Bar
                    type="monotone"
                    dataKey={this.state.currentY}
                    fill="#8884d8"
                  />
                </BarChart>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
