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
import htmlToImage from 'html-to-image';
// import {setThumbnailToGraph} from '../componentUtils'

axios.defaults.baseURL = 'http://localhost:8080'

class SingleGraphView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      legend: -1,
      edit: false,
      svgDisplay: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClone = this.handleClone.bind(this)
    this.exportChart = this.exportChart.bind(this)
    this.exportSVG = this.exportSVG.bind(this)
    // this.saveThumbnail = this.saveThumbnail.bind(this)
  }

  componentDidMount() {
    const { graphId } = this.props.match.params
    const { getGraphId } = this.props
    getGraphId(graphId)
    // this.saveThumbnail(graphId);
  }

  // Exports the graph as embedded JS or PNG
  exportChart() {
    // A Recharts component is rendered as a div that contains namely an SVG
    // which holds the chart. We can access this SVG by calling upon the first child/
    // let chartSVG = ReactDOM.findDOMNode(this.currentChart).children[0];
    let chartSVG = document.getElementById('current-chart').children[0]
    let svgBlob = new Blob([chartSVG.outerHTML], {
      type: 'text/html;charset=utf-8'
    })
    FileSaver.saveAs(svgBlob, this.state.uuid + '.html')
  }

  exportSVG() {
    let chartSVG = document.getElementById('current-chart').children[0];
    const { graphId } = this.props.match.params
    console.log('charSVG in exportAsImage--->>>', chartSVG)
    // let input = document.getElementById('svg-copy')
    // this.setState({svgDisplay: true})
    // let svgURL = new XMLSerializer().serializeToString(chartSVG)
    // input.value = svgURL
    // setThumbnailToGraph(graphId, chartSVG);
    htmlToImage.toJpeg(chartSVG, { backgroundColor: '#FFFFFF', height: 700, width: 700, style: { margin: 'auto', verticalAlign: 'center' } })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
        let svgBlob = new Blob([chartSVG.outerHTML], {
          type: 'text/html;charset=utf-8'
        })
        console.log('svgBlob in exportSVG--->>>', svgBlob);
        axios
        .post(`/api/graphs/aws/thumbnail/${graphId}`, {
          thumbnail: svgBlob
        })
        .then(res => {
          console.log('Thumbnail saved in AWS!', res)
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  // saveThumbnail(graphId) {
  //   let chartSVG = document.getElementById('current-chart').children[0]
  //   console.log('chartSVG in saveThumbnail--->>>', chartSVG)
  //   console.log('graphId in saveThumbnail-->>', graphId);
  //   htmlToImage.toJpeg(chartSVG, { backgroundColor: '#FFFFFF', height: 700, width: 700, style: { margin: 'auto', verticalAlign: 'center' } })
  //     .then(dataUrl => {
  //       setThumbnailToGraph(graphId,dataUrl)
  //       .then(res => {
  //         console.log('Image by default saved', res)
  //       })
  //     })
  //     .catch(err => console.log(err));
  // }

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
    const graphId = crypto
      .randomBytes(8)
      .toString('base64')
      .replace(/\//g, '7')
    const {
      currentX,
      currentY,
      title,
      xAxisName,
      yAxisName,
      colors,
      graphType
    } = this.props.graphSettings
    const { awsId, name } = this.props.dataset
    return axios
      .post(`api/graphs/${graphId}`, {
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
      .then(() => {
        this.props.history.push(`/graph-dataset/customize/${graphId}`)
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
  }

  render() {
    const { graphId } = this.props.match.params
    let { currentY, graphType, colors } = this.props.graphSettings

    return (
      <div>
        {/* this is the code for exporting the image */}
        <button onClick={() => this.exportChart()}>Download as html</button>
        <button onClick={() => this.exportSVG()}>Download as image</button>

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
                  <label>Change title</label>
                  <input type="text" name="title" onChange={this.handleChange} />
                  <label>Change the name of X axis</label>
                  <input type="text" name="XAxis" onChange={this.handleChange} />
                  <label>Change the name of Y axis</label>
                  <input type="text" name="YAxis" onChange={this.handleChange} />
                </form>
                <div>
                  {currentY.map((yAxis, idx) => (
                    <div key={idx}>
                      <label>{`Change the color of the legend of '${yAxis}'`}</label>
                      <button onClick={() => this.handleClick(idx)}>Pick Color</button>
                      {this.state.legend !== -1 ? (
                        <div className="popover">
                          <div className="cover" onClick={this.handleClose} />
                          <HuePicker
                            color={colors[idx]}
                            onChangeComplete={this.handleChangeColor}
                          />
                        </div>) : null}
                    </div>
                  ))}
                </div>
                <button type='submit' onClick={() => this.handleSave(graphId)}>Save</button>
              </div>
            )}
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
  getGraphId: graphid => {
    dispatch(fetchAndSetGraph(graphid))
  },
  getDataset: graphId => {
    dispatch(fetchAndSetDataFromS3(graphId))
  },
  saveGraphSetting: (graphId, settings) => {
    dispatch(saveGraphSettingToDB(graphId, settings))
  }
})

export default connect(mapState, mapDispatch)(SingleGraphView)
