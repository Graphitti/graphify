import Popup from 'reactjs-popup'
import React from 'react'
import {Link} from 'react-router-dom'

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
        <div id="popup-share-container">
          <button
            className="popup-share-button"
            onClick={() => addInput('copied-text', linkcb())}
          >
            Link
          </button>
          <button className="popup-share-button" onClick={downloadcb}>
            Download
          </button>
          <button
            className="popup-share-button"
            onClick={() => addInput('copied-text', svgcb())}
          >
            SVG
          </button>
        </div>
        <div>
          <textarea id="copied-text" style={{ display: 'none' }} />
        </div>
      </div>
    )}
  </Popup>
)

const addInput = (id, text) => {
  const element = document.getElementById(id)
  const popup = document.getElementsByClassName('popup-content')[0]
  element.value = text
  element.style.display = 'inline'
  element.style.height = '1px'
  const newHeight = element.scrollHeight >= 310 ? 310 : element.scrollHeight
  element.style.height = newHeight + 'px'
  popup.style.height = newHeight + 40 + 'px'
  element.select()
  document.execCommand('Copy')
}

export const ErrorPopup = (element, pathname) => (
  <Popup trigger={element} modal closeOnDocumentClick>
    {close => (
      <div>
        <h2>Please Login or Signup to customize your graphs</h2>
          <Link className="navbar-options-buttons" 
          to={{ pathname: "/login", query: {lastPage: pathname}}}
          >Login</Link>
          <Link className="navbar-options-buttons" 
          to={{ pathname: "/signup", query: {lastPage: pathname}}}
          >Sign Up</Link>
        <button onClick={close}>Close</button>
      </div>
    )}
  </Popup>
)


