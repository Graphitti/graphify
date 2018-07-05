import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import store, {getAsyncData} from '../store'
import SearchDatasetPreview from './SearchDatasetPreview'

export default class ShowResults extends Component {
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
                        return (
                            <div className="search-results-dataset search-results-dataset-box" key={result.resource.id}>
                                <SearchDatasetPreview result={result} handleClick={this.handleClick} />
                            </div>
                        )
                    }) :  <h2>Results not found for {search}</h2>
                }
            </div>
        )
    }
}
