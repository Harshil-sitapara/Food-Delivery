const { getUser,setuser } = require("../service/auth");


async function restrictToLoginUserOnly(req, res, next) {
  console.log("req",req)
    const sessionId = req.cookies?.uid;
    console.log("Session ID from Cookie:", sessionId);
    if (!sessionId) {
      return res.status(401).json({ message: "Please log in to continue" });
    }
  
    // if (!user) {
    //   return res.status(401).json({ message: "User not found" });
    // }
  
    req.userId = sessionId;
    next();
    res.status(200).json({cookie:sessionId})
  }
  
module.exports = {
  restrictToLoginUserOnly,
};
