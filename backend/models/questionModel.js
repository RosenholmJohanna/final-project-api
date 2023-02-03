const mongoose = require('mongoose');

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
    answers: [{
      answer: {
        type: String
      },
      createdAt: {
        type: Date,
        default: () => new Date() 
      },
    //   question: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'question'
    //  },
      like: {
        type: Number,
        default: 0
      }
    }]
})
  