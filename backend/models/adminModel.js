const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import crypto from "crypto"

const AdminSchema = new mongoose.Schema({
    adminname: {
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
    provider: {
      type: String,
      required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
    roles: {
      type: [{
          type: String,
          enum: ['user', 'admin']
      }],
      default: ['admin'],
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex")
    }
  });

  const Admin = mongoose.model("Admin", AdminSchema);


  module.exports = Admin