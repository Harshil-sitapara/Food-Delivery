const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  name: {
    type: "String",
    require: true,
  },
  orderId: {
    type: "String",
    require: true,
    unique: true,
  },
  rating: {
    type: "Number",
    require: true,
  },
  delSpeed: {
    type: "String",
    require: true,
  },
  msg: {
    type: "String",
    require: true,
  },
});

//feedback model
const Feedback = mongoose.model("feedback", feedBackSchema);

module.exports = {
  Feedback,
};
