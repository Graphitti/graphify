import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store, { fetchData } from '../store'
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
        store.dispatch(fetchData(domain, id, columObj));
        history.push('/graph');
    }

    render() {
        const { results } = this.props.results;
        console.log('Results in ShowSearchResults --->>>',results)
        return (
            <div className="search-results">
                {results.length > 0 &&
                    results.map((result, idx) => {
                        return (
                                <div key={idx}>
                                    <Link to="/graph" onClick={(event) => this.handleClick(event, result)}>
                                        <h2>{result.resource.name}</h2>
                                    </Link>
                                    <h3>{result.resource.description}</h3>
                                </div>
                        )
                    })}
            </div>
        )
    }
}