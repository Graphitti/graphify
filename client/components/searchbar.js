import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store, { fetchData } from '../store';
import history from '../history';

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: []
        };
    }

    

    render() {
        console.log(this.state)
        const results = this.state.results;
        return (
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    const search = event.target.searchbar.value;
                    axios.get(`https://api.us.socrata.com/api/catalog/v1?only=datasets&q=${search}`)
                        .then(res => this.setState(res.data))
                        .catch(console.error);
                }}>
                    <input name="searchbar" />
                    <button type="submit">search</button>
                </form>
                <div className="search-results">
                    {
                        results.length > 0 && 
                        results.map(result => {
                            return (
                                // <Link>
                                <div key={result.permalink}>
                                    <h2>{result.resource.name}</h2>
                                    <h3>{result.resource.description}</h3>
                                    {/* <Link to="/upload" params={
                                        domain: result.metadata.domain
                                    }>
                                    </Link> */}

                                    <button onClick={(event) => {
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
                                    }>see this data</button>
                                </div>
                                // </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}


