const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    maxlength: [30, "name should be with in 30 char"],
    minlength: [2, "name should be atleast 2 char"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number!"],
    maxlength: [11, "phone number should be with in 11 char"],
    minlength: [11, "phone number should be atleast 11 char"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
    validate: [
      validator.isEmail, "Please enter your valied email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: [6, "password should be atleast 6 char"],
    select: false,
  },
  image: {
    type: String,
    required: false,
    default: "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=900&t=st=1662704766~exp=1662705366~hmac=b64f930f1148a80edff6183ee6b96f384687cc18d9669183a420a5e85007c47d"
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'employee', 'supplier'],
  },
  pumpName: {
    type: String,
    required: false,
    enum: ['HEW', 'ABC', 'XYZ'],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  created: {
    type: Date,
    default: Date.now
  },
})

// password bcrption here...
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// Makeing passwordToken & Return JWT token where user signup...
userSchema.methods.getJwtToken = function () {
  return jwt.sign({
    id: this._id,
    role: this.role
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME
  })
}

// compare password with bcryptjs
userSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password)
  return isMatch;
}

// Generating password Reset token....
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hasing & adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;