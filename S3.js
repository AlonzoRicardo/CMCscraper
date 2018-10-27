require('dotenv').config()
// Load the SDK
let AWS = require('aws-sdk');
let json = require('./written/cmc.json')

//use bucket name of your liking and setup env variables
const BUCKET_NAME = 'node-sdk-sample-47517275-bae7-4cfa-9955-a52e6d1a0714';
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

//create new bucket and assign credentials and file
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: 'cmc.json',
        Body: file
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
        console.log(data);
      });
  });
}

uploadToS3(JSON.stringify(json))