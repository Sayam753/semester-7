const axios = require("axios");
const { generateModelUploadURL } = require("../../S3/Model");
const { sendnotification } = require("../Notification/Utils");
const Model = require("../../models/Model/Model");
const io = require("socket.io-client");
const socket = io(`http://localhost:${process.env.PORT || 8080}`);

const asyncTask = async (model) => {
  const url = await generateModelUploadURL();
  axios.post(
      process.env.MODEL_SERVER,
      {
        url,
        image_url: model.image_url,
      },
      { timeout: 60000 }
    ).then(async (res) => {
      const { model_url } = res.data;
      await Model.findOneAndUpdate({ _id: model._id }, { model_url });
      socket.emit("modalsaved", { user_id: model.user_id });
      sendnotification(model.user_id, model.title);
    }).catch(() => {
      return;
    });
};

module.exports = asyncTask;
