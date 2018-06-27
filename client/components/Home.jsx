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

  handleUpload = (data, fileName) => {
    store.dispatch(uploadData(data, fileName))
  }

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
