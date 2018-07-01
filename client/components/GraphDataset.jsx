import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LineChartGraph,
  BarChartGraph,
  AreaChartGraph,
  RadarChartGraph,
  ScatterChartGraph,
  PieChartGraph
} from './graphs'
import ReactTable from 'react-table'
import { setXAxis, addYAxis, deleteYAxis } from '../store'
import axios from 'axios'
import crypto from 'crypto'



class GraphDataset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yCategQuantity: ['']
    }

    this.addYCategory = this.addYCategory.bind(this)
    this.handleDeleteY = this.handleDeleteY.bind(this)
    this.handleGraphClick = this.handleGraphClick.bind(this)
  }

  addYCategory() {
    this.setState({
      yCategQuantity: [...this.state.yCategQuantity, '']
    })
  }

  handleDeleteY(idx) {
    const { deleteY } = this.props
    deleteY(idx)
    this.setState({
      yCategQuantity: this.state.yCategQuantity.slice(0, -1)
    })
  }

  handleGraphClick(graphType) {
    const {dataset, graphSettings} = this.props
    const {currentX, currentY} = graphSettings
    const datasetName = dataset.name
    //if the dataset already has an aws then we want to make that the awsId
    //this will cause use to reuse that dataset for the graph

    //DELETE THESE CONSOLE LOGS IN FUTURE, useful for testing now
    //awsId will equal a new id or the one that the dataset already has
    const awsId = !!dataset.awsId ? dataset.awsId :  
    crypto
      .randomBytes(8)
      .toString('base64')
      .replace(/\//g, '7');
    console.log('awsId', awsId)

    const graphId = crypto
      .randomBytes(8)
      .toString('base64')
      .replace(/\//g, '7');
    console.log('graphId', graphId)
  
    //upload to AWS only if the dataset doesn't already have an awsId
    let AWSPost = !dataset.awsId ? 
    axios.post(`api/graphs/aws/${awsId}`, {dataset}) :
    AWSPost = Promise.resolve();

    let databasePost = axios.post(`api/graphs/${graphId}`, {
      xAxis: currentX,
      yAxis: currentY,
      title: datasetName,
      datasetName,
      graphType,
      awsId
    })
    Promise.all([AWSPost, databasePost])
      .then(() => {
        this.props.history.push(`/graph-dataset/customize/${graphId}`)
      })
      .catch(console.error)
  }

  render() {
    const {
      dataset,
      graphSettings,
      handleXCategory,
      handleYCategory
    } = this.props
    const { currentX, currentY } = graphSettings
    const columnObj = dataset.dataset.length > 0 ? dataset.columnObj : {}
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
        <h1>{dataset.name}</h1>
        {dataset.dataset.length &&
          xAxis.length && (
            <div>
              <ReactTable
                data={dataset.dataset}
                columns={columns}
                defaultPageSize={5}
              />
            </div>
          )}

        <h1>Select the Data to Graph</h1>
        {dataset.dataset.length && (
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
            {
              currentY.length > 0 && currentX && yAxis.includes(currentX) &&
              <div id="graphs">
                <div onClick={() => this.handleGraphClick('Scatter')}>
                  <ScatterChartGraph />
                </div>
              </div>
            }
            {
              currentY.length > 0 && currentX &&
              <div id="graphs">
                <div onClick={() => this.handleGraphClick('Line')}>
                  <LineChartGraph />
                </div>
                <div onClick={() => this.handleGraphClick('Bar')}>
                  <BarChartGraph />
                </div>
                <div onClick={() => this.handleGraphClick('Area')}>
                  <AreaChartGraph />
                </div>
              </div>
            }
            {
              currentY.length > 0 && currentX && !(yAxis.includes(currentX)) &&
              <div id="graphs">
                <div onClick={() => this.handleGraphClick('Radar')}>
                  <RadarChartGraph />
                </div>
              </div>
            }
            {
              currentY.length === 0 && currentX &&
              <div id="graphs">
                <div onClick={() => this.handleGraphClick('Pie')}>
                  <PieChartGraph />
                </div>
              </div>
            }
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
