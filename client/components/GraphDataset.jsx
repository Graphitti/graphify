import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  LineChartGraph,
  BarChartGraph,
  AreaChartGraph,
  RadarChartGraph,
  ScatterChartGraph,
  PieChartGraph
} from './graphs'
import ReactTable from 'react-table'
import {setXAxis, addYAxis, deleteYAxis} from '../store'

class GraphDataset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yCategQuantity: ['']
    }

    this.addYCategory = this.addYCategory.bind(this)
    this.handleDeleteY = this.handleDeleteY.bind(this)
  }

  addYCategory() {
    this.setState({
      yCategQuantity: [...this.state.yCategQuantity, '']
    })
  }

  handleDeleteY(idx) {
    const {deleteY} = this.props
    deleteY(idx)
    this.setState({
      yCategQuantity: this.state.yCategQuantity.slice(0, -1)
    })
  }

  render() {
    const {
      dataset,
      graphSettings,
      handleXCategory,
      handleYCategory
    } = this.props
    const {currentX, currentY} = graphSettings
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
                <select onChange={handleXCategory}>
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
                        onChange={e => handleYCategory(e.target.value, idx)}
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

            {currentX &&
              currentY.length && (
                <div id="graphs">
                  <LineChartGraph />
                  <BarChartGraph />
                  <AreaChartGraph />
                  <RadarChartGraph />
                  <ScatterChartGraph />
                  <PieChartGraph />
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
    dataset: state.dataset,
    graphSettings: state.graphSettings
  }
}

const mapDispatch = dispatch => ({
  handleXCategory: event => {
    dispatch(setXAxis(event.target.value))
  },
  handleYCategory(yAxis, idx) {
    dispatch(addYAxis(yAxis, idx))
  },
  deleteY(idx) {
    dispatch(deleteYAxis(idx))
  }
})

export default connect(mapState, mapDispatch)(GraphDataset)
