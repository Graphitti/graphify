import React from 'react'
import {connect} from 'react-redux'

const UserProfile = props => {
  const img =
    'http://www.bbc.co.uk/staticarchive/bb96431eddaea776224930aba8d3f8473227932b.gif'
  const dummyData = {
    email: 'corey@gmail.com',
    graphs: [
      {title: 'graph1', thumnail: img},
      {title: 'graph2', thumnail: img},
      {title: 'graph3', thumnail: img},
      {title: 'graph4', thumnail: img}
    ]
  }
  const name = `${dummyData.email[0].toUpperCase()}${dummyData.email.slice(
    1,
    dummyData.email.search('@')
  )}`
  return (
    <div id="profile">
      <h1>Hi, {name}!</h1>
      <h2>Graphs</h2>
      <div id="profile-graphs">
        {dummyData.graphs.map(graph => {
          return (
            <div id="profile-graphs-single">
              <h2>{graph.title}</h2>
              <img src={graph.thumnail} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapState = state => {
    return {
      dataset: state.dataset
    }
  }

export default connect(mapState)(UserProfile)
