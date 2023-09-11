const { Admin } = require("../models/adminModel");
async function handleAdminLogin(req, res) {
  const { email, pass } = req.body;
  try {
    const admin = await Admin.findOne({ email: email, pass: pass });
    if (!admin) return res.status(404).send("Admin not found");
    
    res.cookie("adminId",admin._id);
    console.log("Admin cookie set", admin._id);
    res.status(200).json({ msg: "Admin login" });
  } catch (error) {
    console.log("Error while login Admin!", error);
  }
}

module.exports = {
  handleAdminLogin,
};
