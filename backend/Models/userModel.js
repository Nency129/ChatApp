const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);
// signup method

userSchema.statics.signup = async function (name, email, password, pic) {
  if (!email || !password || !name) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);  //generating salt to hash password
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password:hash, pic }); 

  return user;
};

// login method
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
      throw Error("All fields are required")
  }

  const user = await this.findOne({ email })

  if (!email) {
      throw Error("Invalid Email")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
      throw Error("Incorrect Password")
  }

  return user

}

const User = mongoose.model("User", userSchema);
module.exports = User;
