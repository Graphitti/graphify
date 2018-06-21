import React, { Component } from "react";
import CSVReader from "react-csv-reader";
// import "../../public/styles.css";


export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadFile: []
    }
    this.handleForce = this.handleForce.bind(this)
  }

  handleForce = data => {
    // console.log(data);
    let objArr = [];
    let headers = data[0];

    for (let j = 1; j < data.length; j++){
      let obj = {}
      for (let i = 0; i < headers.length; i++){
        obj[headers[i]] = data[j][i];
      }
      objArr.push(obj);
    }
    this.setState({uploadFile: objArr})
  };

  render(){
    console.log(this.state)
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
