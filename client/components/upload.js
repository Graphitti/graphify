import React, { Component } from "react";
import CSVReader from "react-csv-reader";
// import "../../public/styles.css";


export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.handleForce = this.handleForce.bind(this)
  }

  handleForce = data => {
    console.log(data);
  };

  render(){
    return (
      <div className="container">
      {console.log('upload ......')}
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
