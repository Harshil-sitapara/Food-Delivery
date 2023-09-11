const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  id: Number,
});
//create model
const Cart = mongoose.model("cart", cartSchema);

module.exports = {
  Cart,
};
