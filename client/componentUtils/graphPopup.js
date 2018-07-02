import Popup from 'reactjs-popup'
import React from 'react'

export const GraphPopup = (graph, callback, graphType) => (
    <Popup
        trigger={<div id="graph-link">{graph}</div>}
        modal
        closeOnDocumentClick
    >
        {close => (
            <div>
                <h2>Continuing will save your dataset in our database are you sure you would like to coninute?</h2>
                <button onClick={() => callback(graphType)}>Yes</button>
                <button onClick={close}>No</button>
            </div>
        )
        }
    </Popup>
)