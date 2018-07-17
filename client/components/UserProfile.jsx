import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  meAndGraphImages,
  fetchAndSetDataFromS3,
  resetGraphSettings,
  deleteDataset,
  deleteGraph
} from '../store'
import {ToastContainer} from 'react-toastify'
import {DeletePopup} from '../componentUtils'
import renderHtml from 'react-render-html'
import axios from 'axios'
import htmlToImage from 'html-to-image'

export class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.getBack = this.getBack.bind(this)
  }
  componentDidMount() {
    this.props.meAndGraphImages().then(res => {
      this.props.user.graphs.forEach(graph => {
        const {graphId} = graph
        this.setState({[graphId]: ''})
      })
      let thisPromise = this.props.user.graphs.map(graph => {
        this.getBack(graph.graphId)
          .then(res => {
            const {graphId} = graph;
            this.setState({[graphId]: res.svgBlob})
        })
      })
      Promise.all(thisPromise)
      .catch(console.error)
    })
  }

  handleDatasetClick = awsId => {
    this.props.resetGraphSettings()
    this.props.fetchAndSetDataFromS3(awsId)
  }

  handleDeleteDataset = (datasetId, close) => {
    this.props.deleteDataset(datasetId)
    close()
  }

  handleDeleteGraph = graphId => {
    this.props.deleteGraph(graphId)
  }

  getBack = graphId => {
    return axios
      .get(`/api/graphs/aws/images/${graphId}`)
      .then(res => {
        return res.data
      })
      .catch(console.error)
  }

  // getImage(graphId) {
  //   axios.get(`/api/graphs/aws/${graphId}`)
  //   .then(res => res.data)
  //   .then(res => {
  //     const newImage = document.createElement('img');
  //     newImage.src = res.dataset;
  //     document.getElementById('special-button').appendChild(newImage);
  //   })
  //   .catch(console.error)
  // }

  render() {
    const {graphs, datasets} = this.props.user
    return (
      <div id="profile">
        {/* <button onClick={() => this.getImage('s4+w9KbjbzA=')} id="special-button">get the image</button> */}
        <div id="profile-content">
          <div id="profile-datasets">
            <h2 className="profile-title">My Datasets</h2>
            <div id="profile-datasets-wrapper">
              {datasets &&
                datasets.map(dataset => (
                  <div key={dataset.id} className="dataset-link">
                    <a onClick={() => this.handleDatasetClick(dataset.awsId)}>
                      <h3 id="profile-datasets-wrapper-name">{dataset.name}</h3>
                    </a>
                    {DeletePopup(
                      <button className="delete-dataset-and-graph">x</button>,
                      this.handleDeleteDataset,
                      dataset.id,
                      'dataset'
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div id="profile-graphs">
            <h2 className="profile-title">My Graphs</h2>
            <div id="profile-graphs-wrap">
              {graphs &&
                graphs.map(graph => (
                  <div key={graph.id} className="profile-graphs-single">
                    <Link to={`/graph-dataset/customize/${graph.graphId}`}>
                      <img src={this.state[graph.graphId]}/>
                      {/* <div className="graph-thumbnail-image">
                        {renderHtml(this.state[graph.graphId] || '')}
                      </div> */}
                    </Link>
                    {DeletePopup(
                      <button className="delete-graph">
                        Delete graph
                      </button>,
                      this.handleDeleteGraph,
                      graph.id,
                      'graph'
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  meAndGraphImages: () => dispatch(meAndGraphImages()),
  resetGraphSettings: () => dispatch(resetGraphSettings()),
  fetchAndSetDataFromS3: awsId => dispatch(fetchAndSetDataFromS3(awsId)),
  deleteDataset: datasetId => dispatch(deleteDataset(datasetId)),
  deleteGraph: graphId => dispatch(deleteGraph(graphId))
})

export default connect(mapState, mapDispatch)(UserProfile)
