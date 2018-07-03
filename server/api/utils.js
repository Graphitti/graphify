// CG: MOVE UTILS FILE INTO ANOTHER FOLDER OUTSIDE OF THE API FOLDER

// WHY DOES THIS WORK?!?! //
const {AWS_KEY, AWS_SECRET, AWS_BUCKET} = process.env 
|| require('../../secrets')
////////////////////////////

const AWS = require('aws-sdk')
// set all the keys and region here
AWS.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: 'us-east-2'
})

module.exports = {
  getDatasetFromS3: awsId => {
    let datasetParams = {Bucket: AWS_BUCKET, Key: awsId}
    //this makes the promise to do the actual request, get object is a get request
    let findDatasetPromise = new AWS.S3({apiVersion: '2006-03-01'})
      .getObject(datasetParams)
      .promise()
    return findDatasetPromise
      .then(result => {
        let parsedDataset = JSON.parse(result.Body)
        parsedDataset.dataset.awsId = awsId;
        return parsedDataset
      })
      .catch(err => console.log(err))
  }
}
