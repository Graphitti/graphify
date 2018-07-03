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

import {
  updateTitle,
  updateXAxisName,
  updateYAxisName,
  updateColor,
  fetchAndSetGraph,
  fetchAndSetDataFromS3,
  saveGraphSettingToDB
} from '../store'
import { HuePicker } from 'react-color'
import crypto from 'crypto'
import axios from 'axios'
import FileSaver from 'file-saver'
import { toast, ToastContainer } from 'react-toastify'

axios.defaults.baseURL = 'http://localhost:8080'

class SingleGraphView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      legend: -1,
      svgDisplay: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClone = this.handleClone.bind(this)
    this.exportChart = this.exportChart.bind(this)
    this.exportSVG = this.exportSVG.bind(this)
  }

  componentDidMount() {
    const { graphId } = this.props.match.params
    const { getGraphId } = this.props
    getGraphId(graphId)
  }

  // Exports the graph as embedded JS or PNG
  exportChart(asSVG) {
    // A Recharts component is rendered as a div that contains namely an SVG
    // which holds the chart. We can access this SVG by calling upon the first child/
    // let chartSVG = ReactDOM.findDOMNode(this.currentChart).children[0];
    let chartSVG = document.getElementById('single-graph-container-chart')
      .children[0]
    if (asSVG) {
      let svgURL = new XMLSerializer().serializeToString(chartSVG)
      let svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
      FileSaver.saveAs(svgBlob, this.state.uuid + '.svg')
    } else {
      let svgBlob = new Blob([chartSVG.outerHTML], {
        type: 'text/html;charset=utf-8'
      })
      FileSaver.saveAs(svgBlob, this.state.uuid + '.html')
    }
  }

  exportSVG() {
    let chartSVG = document.getElementById('single-graph-container-chart')
      .children[0]
    let input = document.getElementById('svg-copy')
    this.state.svgDisplay = true
    let svgURL = new XMLSerializer().serializeToString(chartSVG)
    input.value = svgURL
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    switch (name) {
      case 'title':
        return this.props.changeTitle(value)
      case 'XAxis':
        return this.props.changeXAxisName(value)
      case 'YAxis':
        return this.props.changeYAxisName(value)
    }
  }

  handleClick(idx) {
    this.setState({ legend: idx })
  }

  handleChangeColor(color) {
    this.props.changeColor(color.hex, this.state.legend)
    this.setState({ legend: -1 })
  }

  handleClone() {
    const {
      currentX, currentY, title,
      xAxisName, yAxisName, colors, graphType
    } = this.props.graphSettings
<<<<<<< HEAD
    const {awsId, name} = this.props.dataset
    axios
      .post(`api/graphs/${graphId}`, {
=======
    const { awsId, name } = this.props.dataset
    return axios
      .post(`api/graphs`, {
>>>>>>> master
        xAxis: currentX,
        yAxis: currentY,
        //comment in when the models support these
        // xAxisLabel: xAxisName,
        // yAxisLabel: yAxisName,
        // colors,
        title,
        graphType,
        datasetName: name,
        awsId
      })
      .then(res => {
        this.props.history.push(`/graph-dataset/customize/${res.data}`)
        return this.props.getGraphId(res.data)
      })
      .then(() => {
<<<<<<< HEAD
        this.props.history.push(`/graph-dataset/customize/${graphId}`)
        toast('Graph Cloned', {
=======
        return toast('Graph Cloned', {
>>>>>>> master
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        })
      })
      .catch(console.error)
  }

  handleSave(graphId) {
    const settings = this.props.graphSettings
    this.props.saveGraphSetting(graphId, settings)
    toast('Graph Saved', {
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    })
  }

  render() {
<<<<<<< HEAD
    const {graphId} = this.props.match.params
    let {currentY, graphType, colors} = this.props.graphSettings

    return (
      <div id="single-graph">
        <div id="single-graph-buttons">
          <button id="single-graph-buttons-save" onClick={() => this.handleSave(graphId)}>
            Save
          </button>
          <button id="single-graph-buttons-clone" onClick={this.handleClone}>Clone</button>
          <button id="single-graph-buttons-share">Share</button>
        </div>

        <div id="single-graph-container">
          <div id="single-graph-container-chart">
            {(function() {
              switch (graphType) {
                case 'Line':
                  return <LineChartGraph />
                case 'Bar':
                  return <BarChartGraph />
                case 'Area':
                  return <AreaChartGraph />
                case 'Radar':
                  return <RadarChartGraph />
                case 'Scatter':
                  return <ScatterChartGraph />
                case 'Pie':
                  return <PieChartGraph />
                default:
                  return null
              }
            })()}
          </div>

          <div id="single-graph-container-settings">
            <div>
              <div>
                <form>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={this.handleChange}
                  />
                  <label>Name of X Axis`</label>
                  <input
                    type="text"
                    name="XAxis"
                    onChange={this.handleChange}
                  />
                  <label>Name of Y Axis`</label>
                  <input
                    type="text"
                    name="YAxis"
                    onChange={this.handleChange}
                  />
=======
    const { graphId } = this.props.match.params
    let { currentY, graphType, colors } = this.props.graphSettings

    return (
      <div>
        {/* this is the code for exporting the image */}
        <button onClick={() => this.exportChart()}>Download Image</button>
        <button onClick={() => this.exportSVG()}>Get SVG</button>
        <input id="svg-copy" style={{ height: '30px', width: '400px' }} />

        <div id="current-chart">
          {(function () {
            switch (graphType) {
              case 'Line':
                return <LineChartGraph />
              case 'Bar':
                return <BarChartGraph />
              case 'Area':
                return <AreaChartGraph />
              case 'Radar':
                return <RadarChartGraph />
              case 'Scatter':
                return <ScatterChartGraph />
              case 'Pie':
                return <PieChartGraph />
              default:
                return null
            }
          })()}
        </div>

        <div>
          {this.state.edit === false ? (
            <div>
              <button onClick={() => this.setState({ edit: true })}>Edit</button>
              <button onClick={this.handleClone}>Clone</button>
            </div>
          ) : (
              <div>
                <form>
                  <label>{`Change title`}</label>
                  <input type="text" name="title" onChange={this.handleChange} />
                  <label>{`Change the name of X axis`}</label>
                  <input type="text" name="XAxis" onChange={this.handleChange} />
                  <label>{`Change the name of Y axis`}</label>
                  <input type="text" name="YAxis" onChange={this.handleChange} />
>>>>>>> master
                </form>
                <div>
                  {currentY.map((yAxis, idx) => (
                    <div key={idx}>
<<<<<<< HEAD
                      <label
                      >{`${yAxis} Color`}</label>
                      <button onClick={() => this.handleClick(idx)}>
                        Pick Color
                      </button>
                      {this.state.legend !== -1 ? (
                        <div>
                          <div onClick={this.handleClose} />
=======
                      <label>{`Change the color of the legend of '${yAxis}'`}</label>
                      <button onClick={() => this.handleClick(idx)}>Pick Color</button>
                      {this.state.legend !== -1 ? (
                        <div className="popover">
                          <div className="cover" onClick={this.handleClose} />
>>>>>>> master
                          <HuePicker
                            color={colors[idx]}
                            onChangeComplete={this.handleChangeColor}
                          />
<<<<<<< HEAD
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {/* this is the code for exporting the image */}
              <button onClick={() => this.exportChart()}>Download Image</button>
              <button onClick={() => this.exportSVG()}>Get SVG</button>
              <input id="svg-copy" style={{height: '30px', width: '400px'}} />
            </div>
          </div>
=======
                        </div>) : null}
                    </div>
                  ))}
                </div>
                <button type='submit' onClick={() => this.handleSave(graphId)}>{`Save`}</button>
              </div>
            )}
>>>>>>> master
        </div>
        <ToastContainer className="toast" />
      </div>
    )
  }
}

const mapState = state => {
  return {
    graphSettings: state.graphSettings,
    dataset: state.dataset
  }
}

const mapDispatch = dispatch => ({
  changeTitle(title) {
    dispatch(updateTitle(title))
  },
  changeXAxisName(name) {
    dispatch(updateXAxisName(name))
  },
  changeYAxisName(name) {
    dispatch(updateYAxisName(name))
  },
  changeColor(color, idx) {
    dispatch(updateColor(color, idx))
  },
  getGraphId: graphId => {
    dispatch(fetchAndSetGraph(graphId))
  },
  getDataset: graphId => {
    dispatch(fetchAndSetDataFromS3(graphId))
  },
  saveGraphSetting: (graphId, settings) => {
    dispatch(saveGraphSettingToDB(graphId, settings))
  }
})

export default connect(mapState, mapDispatch)(SingleGraphView)
