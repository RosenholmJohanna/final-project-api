const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//boolean admin or not
// new property for owner id - require
// booleean for admin vs user
// create creator for question - if creator id match the question object id then delete.
// same for answer 
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
  
const Question = mongoose.model("Questions", QuestionSchema);
 
module.exports = Question