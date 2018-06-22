import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import store, { uploadData } from "../store";
import history from "../history";


export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadFile: []
    }
    this.handleForce = this.handleForce.bind(this)
  }

  handleForce = data => {
    console.log('the data',data);
    store.dispatch(uploadData(data));
    // history.push("/graph")
  };

  render(){
    return (
      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={this.handleForce}
        />
        <p>and then open the console</p>
      </div>
    );
  }
}
