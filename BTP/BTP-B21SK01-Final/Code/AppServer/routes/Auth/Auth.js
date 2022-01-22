const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/User/User')
const registerSchema = require('../../Schemas/Auth/Register')
const loginSchema = require('../../Schemas/Auth/Login')
const verify = require('./VerifyToken')

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

router.post('/register', async (req, res) => {
    const { error } = registerSchema.validate(req.body) 
    if (error)
    {   
        if(error.details[0].message.includes("pattern")){
            return res.status(400).json({ 'error': "Weak Password" })
        }
        else
            return res.status(400).json({ 'error': error.details[0].message })
    }
        

    try {
        const emailExists = await User.findOne({ email: (req.body.email) })
        if(emailExists)
            return res.status(400).json({ 'error': "Email already registered" })
        }
        catch { return res.status(400).json({ 'error': "Network error" })}

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        picture: req.body.picture || ''
    })

    try {
        await user.save();
        res.json({ 'message': "User Created" })
    } catch{ res.status(400).json({ 'error': "Network error" })}
   
})


router.post('/login', async (req, res) => {

    const { error } = loginSchema.validate(req.body) 
    if (error)
        return res.status(400).json({ 'error': error.details[0].message })

//    IF USER REGISTERED
    try {
        const user = await User.findOne({ email: (req.body.email) })
        if (!user)
            return res.status(400).json({ 'error': "Account not found" })

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass)
            return res.status(400).json({ 'error': "Invalid Credentials!" })

        const token = jwt.sign({ "_id": user._id }, process.env.TOKEN_SECRET)
        return res.status(200).json({ 'token': token, 'user_name': user.user_name, 'email': user.email })

    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

})

router.get('/profile', verify, async (req, res) => {    
    // await sleep(5000)
    try {
        const { username, email, picture } = await User.findOne({_id: req.user._id})
        return res.status(200).json({ username, email, picture })
    } catch {
        return res.status(400).json({ 'error': "Network error" })
    }

})

module.exports = router