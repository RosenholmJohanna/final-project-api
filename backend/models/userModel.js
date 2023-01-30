const mongoose = require('mongoose');
import crypto from "crypto"

export const UserSchema = new mongoose.Schema({
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
      type: String,
      default: 'user'
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex")
    },
  });