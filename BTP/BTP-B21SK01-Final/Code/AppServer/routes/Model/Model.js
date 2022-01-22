const router = require('express').Router()
const Model = require('../../models/Model/Model')
const verify = require('../Auth/VerifyToken')
const mongoose = require('mongoose')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

router.get('/completed', verify, async (req, res) => {
    // await sleep(5000)
    try{
        const model = await Model.aggregate(
        [
                {
                  '$match': {
                    'user_id': mongoose.Types.ObjectId(req.user._id), 
                    'model_url': {
                      '$gt': ''
                    }
                  }
                },
                 {
                    '$sort': {
                      '_id': -1
                    }
                  }
              ]
        )
        return res.status(200).json(model)

    }catch{
        return res.status(400).json({ 'error': "Network error" })
    }
 })


router.get('/pending', verify, async (req, res) => {
    // await sleep(5000)
    try{
        const model = await Model.aggregate(
            [
                {
                  '$match': {
                    'user_id': mongoose.Types.ObjectId(req.user._id), 
                    'model_url': {
                      '$eq': ''
                    }
                  }
                },
                {
                   '$sort': {
                     '_id': -1
                   }
                 }
            ]
        )

        return res.status(200).json(model)

    }catch{
        return res.status(400).json({ 'error': "Network error" })
    }
 })


module.exports = router