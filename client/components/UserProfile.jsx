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
    email.search('@')
  )}`
  return (
    <div>
      <h1>{name}</h1>
      <h2>Graphs</h2>
      <div>
        {dummyData.graphs.map(graph => {
          return (
            <div>
              <h2>{graph.title}</h2>
              <img scr={graph.img} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserProfile
