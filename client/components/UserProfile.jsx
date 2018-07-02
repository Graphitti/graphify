import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me, fetchAndSetDataFromS3, resetGraphSettings, deleteDataset, deleteGraph} from '../store'
import {ToastContainer} from 'react-toastify'
import Popup from "reactjs-popup";

export class UserProfile extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    this.props.me();
  }

  handleDatasetClick = awsId => {
    this.props.resetGraphSettings()
    this.props.fetchAndSetDataFromS3(awsId)
  }

   handleDeleteDataset = datasetId => {
    // this.props.deleteDataset(datasetId)
    // alert('deleting dataset')
      return <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>

  }

   handleDeleteGraph = graphId => {
    this.props.deleteGraph(graphId)
  }

  render() {
   const {email, graphs, datasets} = this.props.user
  const name = email
    ? `${email[0].toUpperCase()}${email.slice(1, email.search('@'))}`
    : ''
  return (
    <div id="profile">
      <h1>Hi, {name}!</h1>
      <div id="profile-content">
        <div id="profile-datasets">
          <h2>My Datasets</h2>
          {datasets &&
            datasets.map(dataset => (
              <div key={dataset.id}>
                <a onClick={() => this.handleDatasetClick(dataset.awsId)}>
                  <h3>{dataset.name}</h3>
                </a>
                <button onClick={() => this.handleDeleteDataset(dataset.id)}>Delete dataset</button>
              </div>
            ))}
        </div>
        <div id="profile-graphs">
          <h2>My Graphs</h2>
          <div id="profile-graphs-wrap">
            {graphs &&
              graphs.map(graph => (
                <div key={graph.id} id="profile-graphs-single">
                  <h2>{graph.title}</h2>
                  <Link to={`/graph-dataset/customize/${graph.graphId}`}>
                    <img src={graph.thumbnail} />
                  </Link>
                  <button onClick={() => this.handleDeleteGraph(graph.id)}>Delete graph</button>
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
