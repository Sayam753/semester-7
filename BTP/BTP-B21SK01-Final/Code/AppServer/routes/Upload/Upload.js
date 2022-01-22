const router = require('express').Router()
const { generateImageUploadURL } = require('../../S3/Image')
const modelSchema = require('../../Schemas/Upload/Model')
const Model = require('../../models/Model/Model')
const verify = require('./VerifyToken')
const asyncTask = require('./AsyncTask')


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

router.get('/image', verify, async (req, res) => {
    // await sleep(5000)
    try{
        const url = await generateImageUploadURL()
        if(url)
            res.json({url})
        else 
            return res.status(400).json({ 'error': "Network error" })
    }catch{
        return res.status(400).json({ 'error': "Network error" })
    }
 })


 router.post('/model', verify, async (req, res) => {
    const { error } = modelSchema.validate(req.body) 
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

    try{
        const model = new Model({
            user_id : req.user._id,
            ...req.body,
            model_url: '',
            date: new Date()
        })
        const savedmodel = await model.save()
        res.json({"message": "received"})

        //send the request to another server
        asyncTask(savedmodel)
        
    }
    catch{
        return res.status(400).json({ 'error': "Network error" })
    }

 })






module.exports = router