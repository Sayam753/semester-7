const router = require("express").Router()
const verify = require("./VerifyToken")
const mongoose = require("mongoose")
const NotificationEndpoint = require("../../models/NotificationEndpoint/NotificationEndpoint")

router.post("/", verify, async (req, res) => {
  try {
    const endpointExists = await NotificationEndpoint.findOne({
      user_id: mongoose.Types.ObjectId(req.user._id),
    })

    if (endpointExists) {
      await NotificationEndpoint.findOneAndUpdate(
        { user_id: mongoose.Types.ObjectId(req.user._id) },
        req.body
      )
      return res.status(201).json({ message: "Endpoint Created" })
    } else {
      const endpoint = new NotificationEndpoint({
        user_id: mongoose.Types.ObjectId(req.user._id),
        ...req.body,
      })

      await endpoint.save()
      return res.status(201).json({ message: "Endpoint Created" })
    }
  } catch {
    return res.status(400).json({ error: "Network Error" })
  }
})

module.exports = router

