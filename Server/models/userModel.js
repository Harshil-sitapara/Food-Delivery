const mongoose = require("mongoose");
//user schema
const userSchema = new mongoose.Schema(
  {
    uname: {
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
const User = mongoose.model("users", userSchema);

module.exports={
  User
}
