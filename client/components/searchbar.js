import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import store, {fetchData} from '../store'
import history from '../history'

//CG: Capitalize classes in the file name!
export default class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: []
    }
  }
  //let us bind the value in the text input to the react component 

  render() {
    //CG: Be cool and destructure. B-D
    const results = this.state.results
    //CG: get rid of console .log
    console.log(results)
    //CG: WHAT IS THE CLASSNAME HERE!?!?! what am i looking at?

    //CG: Please remove complicate function logic from the render method.
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault()
            const search = event.target.searchbar.value
            axios
              .get(
                `https://api.us.socrata.com/api/catalog/v1?only=datasets&q=${search}`
              )
              .then(res => this.setState(res.data))
              .catch(console.error)
          }}
        >
          <input name="searchbar" /> 
          <button type="submit">search</button>
        </form>
        <div className="search-results">
          {results.length > 0 &&
            results.map((result, idx) => {
              return (
                <Link
                  key={idx}
                  to="/graph"
                  onClick={event => {
                    event.preventDefault()
                    const domain = result.metadata.domain
                    const id = result.resource.id
                    let columObj = {}
                    result.resource.columns_name.forEach((columnName, i) => {
                      columObj[columnName] = result.resource.columns_datatype[i]
                    })
                    store.dispatch(fetchData(domain, id, columObj))
                    history.push('/graph')
                  }}
                >
                  <div>
                    <h2>{result.resource.name}</h2>
                    <h3>{result.resource.description}</h3>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    )
  }
}
