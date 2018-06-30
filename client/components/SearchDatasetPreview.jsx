import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import store from '../store'

const DatasetPreview = (props) => {
    const { result } = props;
    console.log('RESULT ---->>>> ', result)
    const description = result.resource.description.split(' ').slice(0, 25);
    return (
        <div className="dataset-preview">
            <a className="dataset-preview-link" onClick={(event) => props.handleClick(event, result)}>
                <h3>{result.resource.name}</h3>
            </a>
            <h5 className="dataset-preview-permalink">{result.permalink}</h5>
            <h4 className="dataset-preview-detail">{description.length === 25 ? description.join(' ') + '...' : description.join(' ')}</h4>
        </div>
    )
}

export default DatasetPreview;