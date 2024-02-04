const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Now we will create a schema , document schema is JSON object that allows you to define the shape and content of documents and embedded documents in a collection
// we create a folder model and define a schema in it and create models means collections

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// we are generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let tokenUser = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: tokenUser });
    await this.save();
    return tokenUser;
  } catch (err) {
    console.log(err);
  }
};

// Storing the Messages coming from contact page
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    // both key-value are same so name:name is same as just writing name
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};

// creating models means collections
// const User ka U should be capital
// First parameter will be in capitals
// Second paramater will be the schema
const User = mongoose.model("USER", userSchema);
module.exports = User;
