import axios from 'axios';
import htmlToImage from 'html-to-image'

export const setThumbnailToGraph = (graphId, chartSVG) => {
  htmlToImage.toJpeg(chartSVG, { backgroundColor: '#FFFFFF', height: 700, width: 700, style: { margin: 'auto', verticalAlign: 'center' } })
    .then(function (dataUrl) {
      console.log('It did thumbnail.js--->>>')
      axios
        .put(`/api/graphs/thumbnail/${graphId}`, {
          thumbnail: dataUrl
        })
        .then(res => {
          console.log('Thumbnail saved!', res)
          return res;
        })
        .catch(err => console.log(err))
    })

} 