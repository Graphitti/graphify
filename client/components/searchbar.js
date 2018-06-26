import React, { Component } from 'react'
import axios from 'axios'
import ShowSearchResults from './ShowSearchResults.jsx'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: [],
            search: '',
            showResults: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const search = event.target.value;
        this.setState({ search })
    }

    handleSubmit(event) {
        event.preventDefault();
        const search = this.state.search;
        axios.get(
            `https://api.us.socrata.com/api/catalog/v1?only=datasets&q=${search}`
        )
            .then(res => {
                this.setState({results: res.data, showResults: true});
            })
            .catch(console.error)
    }

    render() {
        const { results } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} name="searchbar" />
                    <button type="submit">Search</button>
                </form>
                {this.state.showResults &&
                    <ShowSearchResults results={this.state.results} />
                }
            </div>
        )
    }
}
