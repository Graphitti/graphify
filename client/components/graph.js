import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentX: '',
      currentY: [],
      yCategQuantity: ['']
    }

    this.handleXCategory = this.handleXCategory.bind(this)
    this.handleYCategory = this.handleYCategory.bind(this)
    this.handleDeleteY = this.handleDeleteY.bind(this)
    this.addYCategory = this.addYCategory.bind(this)
  }

  handleXCategory(event) {
    this.setState({ currentX: event.target.value })
  }

  handleYCategory(value, idx) {
    const newCurrentY = [...this.state.currentY]
    newCurrentY[idx] = value
    this.setState({
      currentY: newCurrentY
    })
  }

  handleDeleteY(idx) {
    const newCurrentY = [...this.state.currentY]
    newCurrentY.splice(idx, 1)
    this.setState({
      currentY: newCurrentY,
      yCategQuantity: this.state.yCategQuantity.slice(0, -1)
    })
  }

  addYCategory() {
    this.setState({
      yCategQuantity: [...this.state.yCategQuantity, ""]
    })
  }

  render() {
    const { dataset } = this.props
    const columnObj = dataset.length > 0 ? dataset.columnObj : {};
    const xAxis = Object.keys(columnObj)
    const yAxis = xAxis.filter(key => {
      return columnObj[key].toLowerCase() === 'number' || columnObj[key].toLowerCase() === 'percent'
    })
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
    return (
      <div className="container">
        <h1>Select the Data to Graph</h1>
        {dataset.length && (
          <div>
            <div>
              <div>
                <h2>X Axis Data</h2>
                <select onChange={this.handleXCategory}>
                  <option hidden>choose X</option>
                  {xAxis.map(xCategory => (
                    <option key={xCategory}>{xCategory}</option>
                  ))}
                </select>
              </div>
              <div>
                <h2>Y Axis Data</h2>
                <button onClick={this.addYCategory}>+</button>
                {this.state.yCategQuantity.map((n, idx) => {
                  return (
                    <div key={idx}>
                      <select onChange={e => (this.handleYCategory(e.target.value, idx))}>
                        <option hidden>choose Y</option>
                        {yAxis.map(yCategory => (
                          <option key={yCategory}>{yCategory}</option>
                        ))}
                      </select>
                      <button onClick={() => this.handleDeleteY(idx)}>x</button>
                    </div>
                  )
                })}
              </div>
            </div>
            {this.state.currentX && !this.state.currentY.length && (
              <PieChart width={800} height={800}>
                <Pie
                  isAnimationActive={true}
                  data={quantityMaker(dataset, this.state.currentX)}
                  // dataKey={yAxis}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill={colors[0]}
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            )}

            {this.state.currentX &&
              this.state.currentY.length && (
                <div id="graphs">

                  <LineChart width={800} height={800} data={dataset}>
                    {this.state.currentY.map((yAxis, idx) => (
                      <Line
                        key={idx}
                        type="monotone"
                        dataKey={yAxis}
                        stroke={colors[idx]}
                      />
                    ))}
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey={this.state.currentX} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                  </LineChart>

                  <BarChart width={800} height={800} data={dataset}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={this.state.currentX} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {this.state.currentY.map((yAxis, idx) => (
                      <Bar
                        key={idx}
                        type="monotone"
                        dataKey={yAxis}
                        fill={colors[idx]}
                      />
                    ))}
                  </BarChart>

                  <AreaChart width={800} height={800} data={dataset}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={this.state.currentX} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {this.state.currentY.map((yAxis, idx) => (
                      <Area
                        key={idx}
                        type="monotone"
                        dataKey={yAxis}
                        stroke={colors[idx]}
                        fill={colors[idx]}
                      />
                    ))}
                  </AreaChart>

                  <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={dataset}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey={this.state.currentX} />
                    <PolarRadiusAxis />
                    {this.state.currentY.map((yAxis, idx) => (
                      <Radar
                        key={idx}
                        name={yAxis}
                        dataKey={yAxis}
                        stroke={colors[idx]}
                        fill={colors[idx]}
                        fillOpacity={0.6}
                      />
                    ))}
                  </RadarChart>

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

const someData = [
  { name: 'A', value: 20 },
  { name: 'B', value: 30 },
  { name: 'C', value: 40 },
]


function quantityMaker(arr, term) {
  let quantityObj = {};
  arr.forEach(row => {
    let value = row[term];
    quantityObj[value] = quantityObj[value] + 1 || 1;
  });
  let objArr = Object.keys(quantityObj).map(name => {
    return {
      name: name,
      value: quantityObj[name]
    }
  });
  return objArr;
}



export default connect(mapState)(Graph)
