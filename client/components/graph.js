import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentX: '',
      currentY: []
    }

    this.handleXCategory = this.handleXCategory.bind(this)
    this.handleYCategory = this.handleYCategory.bind(this)
  }

  handleXCategory = event => {
    this.setState({currentX: event.target.value})
  }

  handleYCategory = event => {
    this.setState({
      currentY: Array.from(new Set([...this.state.currentY, event.target.value]))
    })
  }
  render() {
    const {dataset} = this.props
    const {columnObj} = dataset
    const xAxis = Object.keys(columnObj)
    const yAxis = xAxis.filter(key => {
      return (
        columnObj[key].toLowerCase() === 'number' ||
        columnObj[key].toLowerCase() === 'percent'
      )
    })
    console.log('STATE-Y', this.state.currentY)
    return (
      <div className="container">
        <h1>Chart</h1>
        {dataset.length && (
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
            {this.state.currentX &&
              this.state.currentY.length && (
                <div>
                  <LineChart width={1000} height={1000} data={dataset}>
                    {this.state.currentY.map(yAxis => (
                      <Line
                        key={yAxis}
                        type="monotone"
                        dataKey={yAxis}
                        fill="#8884d8"
                      />
                    ))}
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey={this.state.currentX} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                  {/* <BarChart width={1000} height={1000} data={dataset}>
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
                  </BarChart> */}
                </div>
              )}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    dataset: state.dataset
  }
}

export default connect(mapState)(Graph)
