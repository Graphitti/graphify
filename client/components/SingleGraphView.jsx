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
  updateDescription,
  updateXAxisName,
  updateYAxisName,
  updateColor,
  fetchAndSetGraph,
  fetchAndSetDataFromS3,
  saveGraphSettingToDB
} from '../store'
import { HuePicker } from 'react-color'
import axios from 'axios'
import FileSaver from 'file-saver'
import { toast, ToastContainer } from 'react-toastify'
import { SharePopup } from '../componentUtils'
import htmlToImage from 'html-to-image'


axios.defaults.baseURL = 'http://localhost:8080'

class SingleGraphView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      legend: -1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClone = this.handleClone.bind(this)
    this.exportChart = this.exportChart.bind(this)
    this.exportSVG = this.exportSVG.bind(this)
    this.giveLink = this.giveLink.bind(this)
    this.testAWS = this.testAWS.bind(this)
  }

  componentDidMount() {
    const { graphId } = this.props.match.params
    const { getGraphId } = this.props
    this.props.getGraphId(graphId)
  }

  // Exports the graph as embedded JS or PNG
  exportChart(asSVG) {
    let chartSVG = document.getElementById('single-graph-container-chart')
      .children[0]
    let svgBlob = new Blob([chartSVG.outerHTML], {
      type: 'text/html;charset=utf-8'
    })
    FileSaver.saveAs(svgBlob, this.state.uuid + '.html')
  }

  testAWS() {
    let chartSVG = document.getElementById('single-graph-container-chart').children[0];
    const { graphId } = this.props.match.params
    htmlToImage.toJpeg(chartSVG, { backgroundColor: '#FFFFFF', height: 700, width: 700, style: { margin: 'auto', verticalAlign: 'center' } })
      .then((dataUrl) => {
        return axios.post('/api/graphs/aws', {
          dataset: dataUrl
        })
      })
      .then(res => {
        console.log('what is this', res)
        return 5
      })
      .cacth(console.error)
  }

  exportSVG() {
    // let chartSVG = document.getElementById('single-graph-container-chart')
    //   .children[0]
    // toast('SVG Copied', {
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true
    // })
    // return new XMLSerializer().serializeToString(chartSVG)


    let chartSVG = document.getElementById('single-graph-container-chart').children[0];
    const { graphId } = this.props.match.params
    console.log('charSVG in exportAsImage--->>>', chartSVG)
    console.log('type', typeof chartSVG)
    // let input = document.getElementById('svg-copy')
    // this.setState({svgDisplay: true})
    // let svgURL = new XMLSerializer().serializeToString(chartSVG)
    // input.value = svgURL
    // setThumbnailToGraph(graphId, chartSVG);
    console.log('outerhtml', chartSVG.outerHTML)
    htmlToImage.toJpeg(chartSVG, { backgroundColor: '#FFFFFF', height: 700, width: 700, style: { margin: 'auto', verticalAlign: 'center' } })
      .then(function (dataUrl) {
        console.log('this was made', dataUrl)
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
        let svgBlob = new Blob([chartSVG.outerHTML], {
          type: 'text/html;charset=utf-8'
        })
      })
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const {
      changeTitle,
      changeXAxisName,
      changeYAxisName,
      addDescription
    } = this.props
    switch (name) {
      case 'title':
        return changeTitle(value)
      case 'description':
        return addDescription(value)
      case 'XAxis':
        return changeXAxisName(value)
      case 'YAxis':
        return changeYAxisName(value)
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
      currentX,
      currentY,
      title,
      xAxisName,
      yAxisName,
      colors,
      graphType,
      description
    } = this.props.graphSettings
    const { awsId, name } = this.props.dataset
    return axios
      .post(`api/graphs`, {
        xAxis: currentX,
        yAxis: currentY,
        xAxisLabel: xAxisName,
        yAxisLabel: yAxisName,
        colors,
        title,
        graphType,
        datasetName: name,
        description,
        awsId
      })
      .then(res => {
        const chartSVG = document.getElementById('single-graph-container-chart').children[0]
        return htmlToImage.toJpeg(chartSVG, { backgroundColor: '#FFFFFF', height: 700, width: 700, style: { margin: 'auto', verticalAlign: 'center' } })
        .then((dataUrl) => {
          return axios.post(`/api/aws/graph/${res.data}`, {
            svgBlob: dataUrl
          })
        })
      })
      .then(res => {
        this.props.history.push(`/graph-dataset/customize/${res.data}`)
        return this.props.getGraphId(res.data)
      })
      .then(() => {
        return toast('Graph Cloned', {
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
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    })
    const chartSVG = document.getElementById('single-graph-container-chart').children[0]
    return htmlToImage.toJpeg(chartSVG, { backgroundColor: '#FFFFFF', height: 700, width: 700, style: { margin: 'auto', verticalAlign: 'center' } })
    .then((dataUrl) => {
      return axios.post(`/api/aws/graph/${graphId}`, {
        svgBlob: dataUrl
      })
    })
      .catch(console.error)
  }

  giveLink() {
    toast('Link Copied', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    })
    return `localhost8080:/graph-dataset/${this.props.match.params.graphId}`
  }

  render() {
    const { graphId } = this.props.match.params
    let { currentY, graphType, colors, description } = this.props.graphSettings
    const image = this.state.image
    return (
      <div id="single-graph">
        <div id="single-graph-buttons">
          <button
            id="single-graph-buttons-save"
            type="submit"
            onClick={() => this.handleSave(graphId)}
          >
            Save
          </button>
          <button id="single-graph-buttons-clone" onClick={this.handleClone}>
            Clone
          </button>
          {SharePopup(
            <button id="single-graph-buttons-share">Share</button>,
            this.exportChart,
            this.giveLink,
            this.exportSVG
          )}
        </div>
        <div id="single-graph-container">
          <div id="single-graph-container-chart">
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
          <div id="single-graph-container-settings">
            <button onClick={this.testAWS}>test aws button</button>
            <div id="single-graph-container-settings-container">
              <form>
                <label>Title</label>
                <input
                  className="single-graph-input"
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                />
                <label>X axis Name</label>
                <input
                  className="single-graph-input"
                  type="text"
                  name="XAxis"
                  onChange={this.handleChange}
                />
                <label>Y axis Name</label>
                <input
                  className="single-graph-input"
                  type="text"
                  name="YAxis"
                  onChange={this.handleChange}
                />
                <label>Description</label>
                <input
                  className="single-graph-input"
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                />
              </form>
              <div>
                {currentY.map((yAxis, idx) => (
                  <div key={idx}>
                    <label>{`${yAxis[0].toUpperCase()}${yAxis.slice(
                      1
                    )} Color`}</label>
                    <button
                      className="single-graph-settings-buttons"
                      onClick={() => this.handleClick(idx)}
                    >
                      Pick Color
                    </button>
                    {this.state.legend !== -1 ? (
                      <div>
                        <div onClick={this.handleClose} />
                        <HuePicker
                          color={colors[idx]}
                          onChangeComplete={this.handleChangeColor}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div id="current-chart-description">
          {description.length !== '' ? (
            <div className="current-chart-description">
              <h3>Description:</h3>
              <p>{`${description}`}</p>
            </div>
          ) : null}
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
  addDescription(description) {
    dispatch(updateDescription(description))
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
