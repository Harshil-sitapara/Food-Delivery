const mongoose = require("mongoose");
//Admin schema
const adminSchema = new mongoose.Schema(
  {
    role: {
      type: "String",
      require: true,
    },
    email: {
      type: "String",
      require: true,
    },
    pass: {
      type: "String",
      require: true,
    },
  },
  { timestamps: true }
);
//user model
const Admin = mongoose.model("admin", adminSchema);

module.exports={
  Admin
}
