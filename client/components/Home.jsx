import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import store, {uploadData, resetGraphSettings} from '../store'
import history from '../history'
// import Link from 'react-router-dom'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleUpload (data, fileName) {
    store.dispatch(resetGraphSettings())
    store.dispatch(uploadData(data, fileName))
  }

  handleSearch (event) {
    event.preventDefault();
    store.dispatch(resetGraphSettings())
    history.push("/search");
  }

  render() {
    return (
      <div className="container">
        <button type="button" onClick={this.handleSearch}>Search</button>
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV"
          onFileLoaded={this.handleUpload}
        />
      </div>
    )
  }
}
