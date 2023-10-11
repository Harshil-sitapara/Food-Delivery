require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const server = express();
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
//models
const { User } = require("./models/userModel.js");
const { Cart } = require("./models/cartModel.js");
const { Orders } = require("./models/orderModel.js");
//controllers
const {
  handleFeedback,
  handleGetFeedback,
  handleDeleteFeedback,
} = require("./controllers/feedbackCon.js");
const { fetchShippedOrders } = require("./controllers/orders.js");
const {
  handleUserLogin,
  handleRegisterUser,
  handleFetchUserCrencials,
} = require("./controllers/user.js");
const{handleAdminLogin} = require("./controllers/admin.js");
//middlewares
const { restrictToLoginUserOnly } = require("./middleware/user.js");
//session
const session = require("express-session");
const BASE_URL = process.env.DATABASE


const corsOptions = {
  origin: true,
  credentials: true,
};
server.use(cors(corsOptions)); 
server.use(cookieParser());
// this allow us to request one port to another
server.use(bodyParser.json());
server.use(express.json());

//connect with db
const main = async () => {
  await mongoose.connect(BASE_URL);
  console.log("DB connected!");
};
main().catch((err) => {
  console.log("Error while connect to db", err);
});

//users
server.post("/users", handleRegisterUser);

server.post("/users/login", handleUserLogin);

server.post("/admin/login", handleAdminLogin);

server.get("/user/fetch",handleFetchUserCrencials)

//show all users to admin
server.get("/allusers", async (req, res) => {
  try {
    const response = await User.find({});
    res.status(200).send(response);
  } catch (error) {
    console.log("Error while insert order", error);
  }
});

//set cart data
server.post("/cart", async (req, res) => {
  let cart = new Cart();
  cart.image = req.body.image;
  cart.name = req.body.name;
  cart.price = req.body.price;
  cart.id = req.body.id;
  const doc = await cart.save();
  console.log("DOC", doc);
  res.status(200).json(req.body);
});

// delete cart items
server.post("/deleteitem", async (req, res) => {
  const { itemId } = req.body;
  await Cart.deleteOne({ _id: itemId });
  res.status(200).send({ message: "OK" });
});

// get cart data
server.get("/mycart", async (req, res) => {
  const docs = await Cart.find({});
  res.status(200).send(docs);
});

//remove all product from cart
server.delete("/deleteCart", async (req, res) => {
  const docs = await Cart.deleteMany({});
  res.status(200).send(docs);
});

//session
// server.use(session({
//   secret: "your-secret-key",
//   resave: false,
//   saveUninitialized: true
// }));


//orders
server.post("/orders",restrictToLoginUserOnly, async (req, res) => {
  try {
    const sessionId = req.headers.uid;
    console.log("Session ID from Cookie:", sessionId);
    const { orderAmount, orderId, userName } = req.body;
    const order = new Orders();
    order.orderAmount = orderAmount;
    order.orderId = orderId;
    order.userName = userName;
    order.orderdBy = req.userId;
    await order.save();
    res.status(200).json({ message: "order confirmed" });
  } catch (error) {
    console.log("Error while insert order", error);
  }
});
// Update order status
server.put("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    await Orders.updateOne({ orderId }, { $set: { orderStatus } });

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log("Error while updating order status", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order status" });
  }
});

//get orders for users
server.get("/orders", async (req, res) => {
  try {
    const sessionId = req.cookies?.uid;
    const response = await Orders.find({orderdBy:sessionId});
    res.status(200).send(response);
  } catch (error) {
    console.log("Error while insert order", error);
  }
});

//get all orders for admin
server.get("/admin/orders", async (req, res) => {
  try {
    const sessionId = req.cookies?.uid;
    const response = await Orders.find({});
    res.status(200).send(response);
  } catch (error) {
    console.log("Error while insert order", error);
  }
});

//get shipped orders
server.get("/api/getTotalShippedOrders", fetchShippedOrders);

//cancel order
server.delete("/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    // Find and delete the order by its orderId
    await Orders.deleteOne({ orderId });

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.log("Error while cancelling order", error);
    res
      .status(500)
      .json({ error: "An error occurred while cancelling the order" });
  }
});

//feedback
server.post("/feedback", handleFeedback);

server.get("/feedback", handleGetFeedback);

server.delete("/feedback/:id", handleDeleteFeedback);

server.post("/clearCookie:title", (req, res) => {
  const {title} = req.params;
  res.clearCookie(title); 
  res.status(200).send({ message: "Cookies cleared" });
});

server.listen(8080, () => {
  console.log("Server started!");
});
