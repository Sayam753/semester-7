const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)

const region = "ap-south-1"
const bucketName = "btp-model-images"
const accessKeyId = "AKIARWQH7AQZWKBPNX6E"
const secretAccessKey = "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"


const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

const generateImageUploadURL = async() => {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex') + ".png"

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

exports.generateImageUploadURL = generateImageUploadURL