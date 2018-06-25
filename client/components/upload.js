import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import store, {uploadData} from '../store'
import history from '../history'

export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload = data => {
    store.dispatch(uploadData(data))
    history.push('/graph')
  }

  render() {
    return (
      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV"
          onFileLoaded={this.handleUpload}
        />
      </div>
    )
  }
}
