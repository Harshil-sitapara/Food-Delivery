const { User } = require("../models/userModel");


const handleUserLogin = async (req, res) => {
  const { uemail, upass } = req.body;
  try {
    const user = await User.findOne({ email: uemail, pass: upass });
    if (!user) return res.status(404).send("User not found");

    
    res.cookie("uid", user._id);//
    console.log("Cookie set:", user._id); 
    res.send({ msg: "User login" });
  } catch (error) {
    console.log("Error while user login", error);
  }
};

const handleRegisterUser = async (req, res) => {
  const { uname, uemail, upass } = req.body;
  const result = await User.create({
    name: uname,
    email: uemail,
    pass: upass,
  });
  res.status(200).send({ msg: "user created!" });
};

const handleFetchUserCrencials=async(req,res)=>{
  try {
    console.log("REQUEST ARIVE")
    const sessionId = req.cookies?.uid;
    const user = await User.findOne({ _id: sessionId });

    if (user) {
      res.json({ email: user.email });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("An error occurred while fetching user credentials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}




module.exports = {
  handleUserLogin,
  handleRegisterUser,
  handleFetchUserCrencials,
};
