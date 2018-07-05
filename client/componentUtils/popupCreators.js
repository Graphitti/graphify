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

export const SharePopup = (element, downloadcb, linkcb, htmlcb) => (
    <Popup
        trigger={element}
        closeOnDocumentClick
        contentStyle={{
            width: "400px",
            height: "50px",
        }}
    >
        {close => (
            <div className="share-popup">
                <div className="share-popup-buttons">
                    <button onClick={downloadcb}>Download</button>
                    <button onClick={() => addInput("copied-text", linkcb())}>Link</button>
                    <button onClick={() => addInput("copied-text", htmlcb())}>html</button>
                </div>
                <div className="share-popup-text">
                    <textarea id="copied-text" style={{ display: "none" }}
                    ></textarea>
                </div>
            </div>
        )
        }
    </Popup>
)

const addInput = (id, text) => {
    const element = document.getElementById(id);
    const popup = document.getElementsByClassName("popup-content")[0];
    element.value = text;
    element.style.display = "inline";
    element.style.height= "1px";
    const newHeight = element.scrollHeight >= 310 ? 310 : element.scrollHeight;
    element.style.height = (newHeight)+"px";
    popup.style.height = (newHeight + 40)+"px";
    element.select();
    document.execCommand("Copy");
}
