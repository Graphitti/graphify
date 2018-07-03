import axios from 'axios';

export const setThumbnailToGraph = (graphId, chartSVG) => {
  const blobThumbnail = new Blob([chartSVG.outerHTML], {
    type: 'text/html;charset=utf-8'
  })
  console.log('It did thumbnail.js--->>>')
    axios
      .put(`/api/graphs/thumbnail/${graphId}`, {
        thumbnail: blobThumbnail
      })
      .then(res => {
        console.log('Thumbnail saved!', res)
        return res;
      })
      .catch(err => console.log(err))
  } 