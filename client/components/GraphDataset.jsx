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
import axios from 'axios'
import {toast} from 'react-toastify'

const contentStyle = {
  maxWidth: '600px',
  width: '90%'
}

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
    const {deleteY} = this.props
    deleteY(idx)
    this.setState({
      yCategQuantity: this.state.yCategQuantity.slice(0, -1)
    })
  }

  handleGraphClick(graphType) {
    const {dataset, graphSettings} = this.props
    const {currentX, currentY} = graphSettings
    const datasetName = dataset.name

    //upload to AWS only if the dataset doesn't already have an awsId
    let AWSPost = !dataset.awsId
      ? axios.post(`api/graphs/aws`, {dataset})
      : (AWSPost = Promise.resolve({data: dataset.awsId}))

    AWSPost.then(res => {
      return axios.post(`api/graphs`, {
        xAxis: currentX,
        yAxis: currentY,
        title: datasetName,
        datasetName,
        graphType,
        awsId: res.data
      })
    })
      .then(res => {
        this.props.history.push(`/graph-dataset/customize/${res.data}`)
      })
      .catch(console.error)

    if (!dataset.awsId) {
      setTimeout(() => {
        toast('Dataset Saved', {
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        })
      }, 500)
    }

    setTimeout(() => {
      toast('Graph Saved', {
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      })
    }, 1000)
  }

  render() {
    const {
      dataset,
      graphSettings,
      handleXCategory,
      handleYCategory
    } = this.props
    const {currentX, currentY} = graphSettings
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
    const displayScatter = currentY.length > 0 && currentX && yAxis.includes(currentX);
    const displayGroup = currentY.length > 0 && currentX;
    const displayRadar = currentY.length > 0 && currentX && !yAxis.includes(currentX);
    const displayPie = currentY.length === 0 && currentX && !yAxis.includes(currentX);
    return (
      <div id="graph-dataset">
        <div id="graph-dataset-table-container">
          <h1 id="graph-dataset-table-container-name">{dataset.name}</h1>
          {dataset.dataset.length &&
            xAxis.length && (
              <div id="graph-dataset-table-container-table">
                <ReactTable
                  data={dataset.dataset}
                  columns={columns}
                  defaultPageSize={5}
                />
              </div>
            )}
        </div>
        <h1 id="graph-dataset-select-name">Select the Data to Graph</h1>
        {dataset.dataset.length && (
          <div>
            <div id="graph-dataset-select-x-y">
              <div>
                <h3>X Axis Data</h3>
                <select
                  className="graph-dataset-select-x-y-input"
                  onChange={handleXCategory}
                >
                  <option hidden>choose X</option>
                  {xAxis.map(xCategory => (
                    <option key={xCategory}>{xCategory}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="graph-dataset-select-y">
                  <h3>Y Axis Data</h3>
                  <button
                    id="graph-dataset-select-y-add"
                    onClick={this.addYCategory}
                  >
                    +
                    </button>
                </div>
                {this.state.yCategQuantity.map((n, idx) => {
                  return (
                    <div className="graph-dataset-select-y" key={idx}>
                      <select
                        className="graph-dataset-select-x-y-input"
                        onChange={e => handleYCategory(e.target.value, idx)}
                      >
                        <option hidden>choose Y</option>
                        {yAxis.map(yCategory => (
                          <option key={yCategory}>{yCategory}</option>
                        ))}
                      </select>
                      <button
                        id="graph-dataset-select-y-delete"
                        onClick={() => this.handleDeleteY(idx)}
                      >
                        x
                        </button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="graph-dataset-graphs" id="all-graphs">
              <div onClick={() => this.handleGraphClick('Scatter')} className="graph"
                style={{ display: displayScatter ? 'inline' : 'none' }}
              >
                <ScatterChartGraph />
              </div>
              <div onClick={() => this.handleGraphClick('Line')} className="graph"
                style={{ display: displayGroup ? 'inline' : 'none' }}>
                <LineChartGraph />
              </div>
              <div onClick={() => this.handleGraphClick('Bar')} className="graph"
                style={{ display: displayGroup ? 'inline' : 'none' }}>
                <BarChartGraph />
              </div>
              <div onClick={() => this.handleGraphClick('Area')} className="graph"
                style={{ display: displayGroup ? 'inline' : 'none' }}>
                <AreaChartGraph />
              </div>
              <div onClick={() => this.handleGraphClick('Radar')} className="graph"
                style={{ display: displayRadar ? 'inline' : 'none' }}>
                <RadarChartGraph />
              </div>
              <div onClick={() => this.handleGraphClick('Pie')} className="graph"
                style={{ display: displayPie ? 'inline' : 'none' }}>
                <PieChartGraph />
              </div>
            </div>
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
