import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UserProfile = props => {
  const {email, graphs} = props.user
  // const img =
  //   'http://www.bbc.co.uk/staticarchive/bb96431eddaea776224930aba8d3f8473227932b.gif'

  // const graphs = [
  //   {title: 'graph1', thumnail: img},
  //   {title: 'graph2', thumnail: img},
  //   {title: 'graph3', thumnail: img},
  //   {title: 'graph4', thumnail: img}
  // ]
  const name = email
    ? `${email[0].toUpperCase()}${email.slice(1, email.search('@'))}`
    : ''
  return (
    <div id="profile">
      <h1>Hi, {name}!</h1>
      <h2>Graphs</h2>
      <div id="profile-graphs">
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
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserProfile)
