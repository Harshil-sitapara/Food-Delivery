const { Feedback } = require("../models/feedbackModel.js");

const handleFeedback = async (req, res) => {
  const { name, orderId, rating, deliverySpeed, message } = req.body;
  const result = await Feedback.create({
    name: name,
    orderId: orderId,
    rating: rating,
    delSpeed: deliverySpeed,
    msg: message,
  });
  res.status(200).send({ message: "FeedBack sent!" });
};

const handleGetFeedback=async(req,res)=>{
    const result = await Feedback.find({})
    res.status(200).send(result)
}

const handleDeleteFeedback=async(req,res)=>{
  const {id} = req.params;
  console.log(req.body)
    const result = await Feedback.deleteOne({_id:id})
    res.status(200).json({msg:"Feedback deleted!"})
}

module.exports={
  handleFeedback,
  handleGetFeedback,
  handleDeleteFeedback
}