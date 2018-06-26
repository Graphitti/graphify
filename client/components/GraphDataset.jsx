import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  LineChartGraph,
  BarChartGraph,
  AreaChartGraph,
  RadarChartGraph,
  ScatterChartGraph,
  PieChartGraph
} from './graphs'
import ReactTable from 'react-table'

class GraphDataset extends Component {
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
    this.setState({currentX: event.target.value})
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
      yCategQuantity: [...this.state.yCategQuantity, '']
    })
  }

  render() {
    const {dataset} = this.props
    const columnObj = dataset.length > 0 ? dataset.columnObj : {}
    const xAxis = Object.keys(columnObj)
    const yAxis = xAxis.filter(key => {
      return (
        columnObj[key].toLowerCase() === 'number' ||
        columnObj[key].toLowerCase() === 'percent'
      )
    })
    const columns = xAxis.map(column => {
      return {
        Header: column,
        accessor: column,
        width: 'auto'
      }
    })
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042']
    return (
      <div className="graphContainer">
        <h1>Table</h1>
        {dataset.length &&
          xAxis.length && (
            <div>
              <ReactTable
                data={dataset}
                columns={columns}
                defaultPageSize={5}
              />
            </div>
          )}

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
                      <select
                        onChange={e =>
                          this.handleYCategory(e.target.value, idx)
                        }
                      >
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

            {this.state.currentX &&
              this.state.currentY.length && (
                <div id="graphs">
                  <LineChartGraph
                    columnObj={columnObj}
                    colors={colors}
                    currentX={this.state.currentX}
                    currentY={this.state.currentY}
                  />

                  <BarChartGraph
                    columnObj={columnObj}
                    colors={colors}
                    currentX={this.state.currentX}
                    currentY={this.state.currentY}
                  />

                  <AreaChartGraph
                    colors={colors}
                    currentX={this.state.currentX}
                    currentY={this.state.currentY}
                  />

                  <RadarChartGraph
                    colors={colors}
                    currentX={this.state.currentX}
                    currentY={this.state.currentY}
                  />

                  <ScatterChartGraph
                    colors={colors}
                    currentX={this.state.currentX}
                    currentY={this.state.currentY}
                  />

                  <PieChartGraph
                    colors={colors}
                    currentX={this.state.currentX}
                    currentY={this.state.currentY}
                  />
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

export default connect(mapState)(GraphDataset)
