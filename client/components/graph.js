import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'


class Graph extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        console.log(this.props.state)
        return(
            <div>
                {
                    this.props.state.dataset.length > 0 &&
                    <h1>WE GOT IT</h1>
                }
            </div>
        )
    }
}


const mapState = state => {
    return {
        state: state
    }
}

export default connect(mapState)(Graph)