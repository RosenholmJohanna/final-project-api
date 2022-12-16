const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: () => new Date() 
    },
    roles: {
      type: [{
        type: String,
        enum: ['user', 'admin']
      }],
      default: ['user'],
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex")
    },
    collections: {
      type: [String] //questions = string & imgages = BSON?
    }
  });
 
  const User = mongoose.model("User", UserSchema);


  module.exports = User