import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import store, {getAsyncData} from '../store'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, result) {
        event.preventDefault();
        const domain = result.metadata.domain;
        const id = result.resource.id;
        const datasetName = result.resource.name;
        let columObj = {};
        result.resource.columns_name.forEach((columnName, i) => {
            columObj[columnName] = result.resource.columns_datatype[i];
        })
        store.dispatch(getAsyncData(domain, id, columObj, datasetName));
    }

    render() {
        const { results } = this.props.results;
        const {search} = this.props;
        return (
            <div className="search-results">
                {results.length > 0 ?
                    results.map((result, idx) => {
                        const description = result.resource.description.split(' ').slice(0,200);
                        return (
                                <div key={idx}>
                                    <a onClick={(event) => this.handleClick(event, result)}>
                                        <h2>{result.resource.name}</h2>
                                    </a>
                                    <h4>{description.length === 200 ? description.join(' ') + '...' : description.join(' ')}</h4>
                                </div>
                        )
                    }) :  <h2>Results not found for {search}</h2>
                }
            </div>
        )
    }
}