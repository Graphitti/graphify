import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import store, {uploadData} from '../store'
import history from '../history'
// import Link from 'react-router-dom'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload = data => {
    //CG: we should only update history if we actually complete the dispatched action.
    store.dispatch(uploadData(data))
    history.push('/graph') //we might want to think about constructing a replicable url here.
    // /graph?source=upload  /graph?source="http://soda.com/pepsi"
  }

  //cssClass formatting. 
  //className="home-container"
  //"home-container-button" ..

  /*

  .home {
    //all styles applying to home 

    &-container {

      &-button {

      }
    }
  }

  */
  render() {
    return (
      <div className="container">
        <button type="button" onClick={event => {
          event.preventDefault();
          history.push("/search");
        }}>Search</button>
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV"
          onFileLoaded={this.handleUpload}
        />
      </div>
    )
  }
}
