import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  me,
  fetchAndSetDataFromS3,
  resetGraphSettings,
  deleteDataset,
  deleteGraph
} from '../store'
import {ToastContainer} from 'react-toastify'
import {DeletePopup} from '../componentUtils'

const contentStyle = {
  maxWidth: '600px',
  width: '90%'
}

export class UserProfile extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.me()
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

  render() {
    const {graphs, datasets} = this.props.user
    return (
      <div id="profile">
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
                    <h2>{graph.title}</h2>
                    <Link to={`/graph-dataset/customize/${graph.graphId}`}>
                      <img src={graph.thumbnail} />
                    </Link>
                    {DeletePopup(
                      <button className="delete-dataset-and-graph">
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
  me: () => dispatch(me()),
  resetGraphSettings: () => dispatch(resetGraphSettings()),
  fetchAndSetDataFromS3: awsId => dispatch(fetchAndSetDataFromS3(awsId)),
  deleteDataset: datasetId => dispatch(deleteDataset(datasetId)),
  deleteGraph: graphId => dispatch(deleteGraph(graphId))
})

export default connect(mapState, mapDispatch)(UserProfile)
