const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)

const region = "ap-south-1"
const bucketName = "btp-model"
const accessKeyId = "AKIARWQH7AQZSHBIGDRL"
const secretAccessKey = "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"


const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

const generateModelUploadURL = async() => {
  const rawBytes = await randomBytes(16)
  const modelName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: modelName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

exports.generateModelUploadURL = generateModelUploadURL