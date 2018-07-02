import React, {Component} from 'react'
import CSVReader from 'react-csv-reader'
import store, {uploadData, resetGraphSettings} from '../store'
import history from '../history'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleUpload(data, fileName) {
    store.dispatch(resetGraphSettings())
    store.dispatch(uploadData(data, fileName))
  }

  handleSearch(event) {
    event.preventDefault()
    store.dispatch(resetGraphSettings())
    history.push('/search')
  }

  handleToast = () =>
    toast.success('🦄 Wow so easy!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    })

  render() {
    return (
      <div id="home">
        <div>
          <h1 id="home-name">GRAPHIFY</h1>
          <h3>Graph Your World</h3>
        </div>
        <div id="home-buttons-container">
          <button className="home-buttons" onClick={this.handleSearch}>
            Search Our Datasets
          </button>
          <CSVReader
            cssClass="home-buttons react-csv-input"
            onFileLoaded={this.handleUpload}
          />
        </div>
        <div>
          <button className="home-buttons" onClick={this.handleToast}>
            Toast
          </button>
          <ToastContainer
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            pauseOnHover
          />
        </div>
      </div>
    )
  }
}
