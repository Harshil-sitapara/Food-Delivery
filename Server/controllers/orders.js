const {Orders} = require("../models/orderModel.js")

const fetchShippedOrders = async(req,res)=>{
    try {
        const shippedOrderCount = await Orders.countDocuments({ orderStatus: "Delivered" });
        res.status(200).json({ count: shippedOrderCount });
      } catch (error) {
        console.log("Error while fetching total shipped orders count", error);
        res.status(500).json({ error: "An error occurred while fetching total shipped orders count" });
      }
  }

  module.exports={
    fetchShippedOrders
  }