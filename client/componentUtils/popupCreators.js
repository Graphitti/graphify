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

export const DeletePopup = (element, callback, id, keyword) => (
    <Popup
    trigger={element}
    modal
    closeOnDocumentClick
  >
    {close => (
      <div>
        <h2>Are you sure you want to delete this {keyword}?</h2>
        <button onClick={() => callback(id, close)}>Yes, delete</button>
        <button onClick={close}>No, don't delete</button>
      </div>
    )
    }
  </Popup>
)