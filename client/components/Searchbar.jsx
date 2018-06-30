import React, { Component } from 'react'
import axios from 'axios'
import ShowSearchResults from './ShowSearchResults.jsx'
import history from '../history'
import { getSocrataCategories, searchSocrataForDatasets } from './utils/socrataFunctions'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: [],
            search: '',
            showResults: false,
            submittedSearch: '',
            searchCategories: [],
            filter: 'no filter'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {search} = this.props.location;
        const queryIndex = search.indexOf('?query=');
        const filterIndex = search.indexOf('&filter=');
        let filter, searchbar;
        let end = filterIndex === -1 ? search.length : filterIndex
        if (filterIndex !== -1) {
            filter = search.slice(filterIndex + 8).replace(/%20/g, ' ');
        }
        if (queryIndex !== -1) {
            searchbar = search.slice(queryIndex + 7, end).replace(/%20/g, ' ');
            this.setState({search: searchbar});
        }
        getSocrataCategories()
        .then(categories => {
            let setFilter = categories.includes(filter) ? filter : 'no filter';
            this.setState({searchCategories: categories, filter: setFilter})
        })
        .catch(console.error)
    }

    handleChange(event) {
        const search = event.target.value;
        this.setState({ search })
    }

    handleFilter(event) {
        const filter = event.target.value;
        this.setState({ filter })
    }

    handleSubmit(event) {
        event.preventDefault();
        const {search} = {...this.state};
        const filter = this.state.filter === 'no filter' ? '' : this.state.filter;
        searchSocrataForDatasets(search, filter)
        .then(results => {
            this.setState({results, showResults: true, submittedSearch: search});
            history.push(`/search?query=${search}&filter=${filter}`);
        })
        .catch(console.error)
    }

    render() {
        const { results, submittedSearch, searchCategories } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} name="searchbar" value={this.state.search} />
                    {
                        searchCategories.length > 0 &&
                        <select onChange={this.handleFilter} value={this.state.filter}>
                            <option value="no filter">no filter</option>
                            {
                                searchCategories.map(category => (
                                    <option value={category} key={category}>
                                        {category}
                                    </option>
                                ))
                            }
                        </select>
                    }
                    <button type="submit">Search</button>
                </form>
                {this.state.showResults &&
                    <ShowSearchResults results={results} search={submittedSearch} />
                }
            </div>
        )
    }
}
