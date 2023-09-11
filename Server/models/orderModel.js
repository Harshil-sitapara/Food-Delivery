const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderAmount: Number,
  orderId: mongoose.Schema.Types.Mixed,
  userName: String,
  orderStatus: String,
  orderTime: { type: Date, default: Date.now },
  orderdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

//orders model
const Orders = mongoose.model("orders", orderSchema);

module.exports = {
  Orders,
};
