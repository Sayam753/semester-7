const webpush = require("web-push")
var mongoose = require("mongoose")
const NotificationEndpoint = require("../../models/NotificationEndpoint/NotificationEndpoint")

const publicVapidkey = "BCeTHaAuVH4EdRA8dbrbdv9xR0NqwA6EBReXEeCdMzSOgZLL7L8mGnzgDJBxj_tqA2n7Q3-Rth1iTbWqQJNGYbg"
const privateVapidkey = "AnKUJz0M7b7J0x7djb3npO8s9H2Q-DzmYMo7k2m1Kg0"

webpush.setVapidDetails("mailto:lpczeffy@gmail.com", publicVapidkey, privateVapidkey)

//Sends Upcoming assignment mobile/desktop notification to a subscribed student
const sendnotification = async(user_id, title) => {
  try {
    const endpoint = await NotificationEndpoint.findOne({user_id: mongoose.Types.ObjectId(user_id)})
    if (!endpoint)
      return
    const payload = JSON.stringify({
      title: 'Furniture 3D',
      body: `Your Model ${title} is Ready. ✔`,
      icon: 'https://res.cloudinary.com/dez3yjolk/image/upload/v1631435452/assets/lamp_p6vdnv.png',
      badge: 'https://res.cloudinary.com/dez3yjolk/image/upload/v1631435452/assets/lamp_p6vdnv.png'
    })
    webpush
      .sendNotification(endpoint, payload)
      .catch((err) => console.error(err))
  } catch (e) {
    console.log("Unable to send Notification")
  }
}

module.exports.sendnotification = sendnotification
