const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new mongoose.Schema({
    message: {
      type: String, 
        roles: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    createdAt: {
      type: Date,
      default: () => new Date() 
    },
    likes: {
      type: Number,
      default: 0
     },
    isCollected: {
      type: Boolean,
      default: false
    },
    answer: {
        type: String, 
          roles: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'admin' 
          }
      },
})
  
const Question = mongoose.model("Question", QuestionSchema);
 
module.exports = Question