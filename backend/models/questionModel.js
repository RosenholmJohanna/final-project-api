//import mongoose from 'mongoose';
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;


//boolean admin or not
// new property for owner id - require
// booleean for admin vs user
// create creator for question - if creator id match the question object id then delete.
// same for answer 

export const QuestionSchema = new mongoose.Schema({
    message: {
      type: String, 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    createdAt: {
      type: Date,
      default: () => new Date() 
    },
    likes: {
      type: Number,
      default: 0
     },
     disLikes: {
      type: Number,
      default: 0
     },
    isCollected: {
      type: Boolean,
      default: false
    },
    answers: [{
      answer: {
        type: String
      },
      createdAt: {
        type: Date,
        default: () => new Date() 
      },
      // question: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'question'
    //  },
      likes: {
        type: Number,
        default: 0
      }
    }]
})
  
//const Question = mongoose.model("Questions", QuestionSchema);
//module.exports = Question