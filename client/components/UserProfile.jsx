import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store, {fetchAndSetDataFromS3} from '../store'

const UserProfile = props => {
  console.log('USER', props.user)
  console.log(props)
  async function handleDatasetClick(awsId) {
    await store.dispatch(fetchAndSetDataFromS3(awsId))
    props.history.push('/graph-dataset')
  }
  const {email, graphs, datasets} = props.user
  const name = email
    ? `${email[0].toUpperCase()}${email.slice(1, email.search('@'))}`
    : ''
  return (
    <div id="profile">
      <h1>Hi, {name}!</h1>
      <div id="profile-content">
        <div id="profile-datasets">
          <h2>Datasets</h2>
          {datasets &&
            datasets.map(dataset => (
              <div key={dataset.id}>
                <h3 onClick={() => handleDatasetClick(dataset.awsId)}>{dataset.name}</h3>
              </div>
            ))}
        </div>
        <div id="profile-graphs">
          <h2>Graphs</h2>
          <div id="profile-graphs-wrap">
            {graphs &&
              graphs.map(graph => (
                <div key={graph.id} id="profile-graphs-single">
                  <h2>{graph.title}</h2>
                  <Link to={`/graph-dataset/customize/${graph.graphId}`}>
                    <img src={graph.thumbnail} />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserProfile)
