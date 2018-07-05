import Popup from 'reactjs-popup'
import React from 'react'
import {toast} from 'react-toastify'

export const GraphPopup = (graph, callback, graphType) => (
  <Popup
    trigger={<div id="graph-link">{graph}</div>}
    modal
    closeOnDocumentClick
  >
    {close => (
      <div>
        <h2>
          Continuing will save your dataset in our database are you sure you
          would like to coninute?
        </h2>
        <button onClick={() => callback(graphType)}>Yes</button>
        <button onClick={close}>No</button>
      </div>
    )}
  </Popup>
)

export const DeletePopup = (element, callback, id, keyword) => (
  <Popup style="opacity: 0" trigger={element} modal closeOnDocumentClick>
    {close => (
      <div id="popup-delete">
        <h2>Are you sure you want to delete this {keyword}?</h2>
        <div>
          <button
            id="popup-delete-buttons-yes"
            onClick={() => callback(id, close)}
          >
            Yes
          </button>
          <button id="popup-delete-buttons-no" onClick={close}>
            No
          </button>
        </div>
      </div>
    )}
  </Popup>
)

export const SharePopup = (element, downloadcb, linkcb, svgcb) => (
  <Popup trigger={element} closeOnDocumentClick>
    {close => (
      <div id="popup-share">
        <button
          onClick={() => {
            addInput('Link', linkcb())
          }}
        >
          Link
        </button>
        <input id="Link" style={{display: 'none'}} />
        <button onClick={downloadcb}>Download</button>
        <button onClick={() => addInput('SVG', svgcb())}>SVG</button>
        <input id="SVG" style={{display: 'none'}} />
      </div>
    )}
  </Popup>
)

const addInput = (id, text) => {
  let element = document.getElementById(id)
  element.value = text
  element.style.display = 'inline'
  element.select()
  document.execCommand('Copy')
  toast(`${id} Copied`, {
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  })
}
