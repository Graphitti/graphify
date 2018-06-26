import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store, {getAsyncData} from '../store'
import history from '../history'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, result) {
        event.preventDefault();
        const domain = result.metadata.domain;
        const id = result.resource.id;
        let columObj = {};
        result.resource.columns_name.forEach((columnName, i) => {
            columObj[columnName] = result.resource.columns_datatype[i];
        })
        store.dispatch(getAsyncData(domain, id, columObj));
        history.push('/graph-dataset');
    }

    render() {
        const { results } = this.props.results;
        const {search} = this.props;
        console.log('Results in ShowSearchResults --->>>',results)
        return (
            <div className="search-results">
                {results.length > 0 ?
                    results.map((result, idx) => {
                        return (
                                <div key={idx}>
                                    <Link to="/graph" onClick={(event) => this.handleClick(event, result)}>
                                        <h2>{result.resource.name}</h2>
                                    </Link>
                                    <h4>{result.resource.description.split(' ').slice(0,201).join(' ') + '...'}</h4>
                                </div>
                        )
                    }) :  <h2>Results not found for {search}</h2>
                }
            </div>
        )
    }
}