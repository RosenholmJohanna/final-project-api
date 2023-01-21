import express from "express";
import cors from "cors";
import crypto from "crypto"
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

import { UserSchema } from "./models/userModel";
const User = mongoose.model("User", UserSchema);

import { QuestionSchema } from "./models/questionModel"
import { exec } from "child_process";
const Question = mongoose.model("Questions", QuestionSchema);

//const User = require('./models/userModel')
const Admin = require('./models/adminModel')
//const Question = require('./models/questionModel')

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
//mongoose.set('strictQuery', true); //due warning mongoose 7 
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to the Database successfully')
}); mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// List endpoints
app.get("/endpoints", (req, res) => {
    res.send(listEndpoints(app))
  });

  //GET ALL USERS
  app.get("/users", async (req, res)=> {
    const users = await User.find({});
    res.status(200).json({
      success: true, 
      message: "all users", 
      response: users});
  });

// GET USER BY USERNAME
app.get("/users/:username", async (req, res)=> {
  const {username} = req.params
  try {
    const Profile = await User.findOne({username}).exec();
    res.json({
      success: true, 
      username: Profile.username, 
      id: Profile._id,
      //collections: Profile.collections
    })
} catch (error) {
  res.status(400).json({success: false, message: 'Can not find user ', error});
}
});

//GET USER BY ID 
  app.get("/users/id/:_id", async (req, res) => {
    const { _id } = req.params
    try {
    if(_id) {
      const userById =await User.findById({_id}).exec();
      //const collections = []
      res.status(200).json({
        data: userById,
        success: true,
      })
    } else {
      res.status(404).json({
        error: 'No user with that user ID was found.',
        success: false,
      })
    }
    } catch (err) {
      res.status(400).json({
        error: 'Invalid user ID',
        success: false,
      })
    }
    })

    // DELETE USER BY ID
    app.delete('/users/:id', async (req, res) => {
      const { id } = req.params
      try {
        const deletedUserById = await User.findByIdAndDelete(id)
        if (deletedUserById) {
          res.json({
            success: true, deletedUserById,
            message: 'user is deleted'
          })
        } else {
          res.status(404).json({ 
            success: false, 
            message: 'User with this ID could not be deleted'
          })
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Invalid delete user request', error })
      }
    })


// USER REGISTRATION ENDPOINT ( this sent to the browser what we get)
app.post("/register",  async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 3) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 3 characters long"
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
          // roles: newUser.roles
        }
      });
    }
  } catch(error) {
      res.status(400).json({
        success: false,
        response: error
      });
  }
});

// USER LOGIN ENDPOINT
app.post("/login", async (req, res) => {
  const { username, password} = req.body;
  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          roles: user.roles,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
});

//// AUTHORIZATION USER
// next = callback function
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      req.user = user 
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}

//GET ALL ADMINS - works
// ADMIN REGISTRATION ENDPOINT - works
// //// AUTHORIZATION ADMIN

// GET ALL QUESTIONS FROM ALL USERS, authenticateAdmin
app.get("/questions", authenticateUser, async (req, res)=> {
  try {
  const questions = await Question.find().sort({createdAt: 'desc'}).limit(10).exec() 
  res.status(200).json({
    success: true, 
    response: questions
  }); 
} catch (err) {
  res.status(400).json({
    success: false,
    message: 'Invalid request for questions'
  })
}
})


// GET ALL ANSWERS
// QuestionSchema.aggregate([
//   {$match: {}},
//   {$project: {answers: 1, _id: 0}}
// ])

// GET ALL ANSWERS ONLY (if question have no answer then it return empty array on these) - WORKS
app.get('/answers', (req, res) => {
  Question.find({}, { answers: 1, _id: 0 })
    .then(answer => res.status(200).send(answer))
    .catch(err => res.status(500).send(err));
});

// ANSWER BY ID -response in console
app.get('/question/:question_id/answer/:answer_id', function(req, res){
  Question.findById(req.params.question_id, function(err, Questions) {
    console.log(req.params.answer_id);
    var doc = Questions.answers.id(req.params.answer_id);
    console.log(doc);
  });
});

// // GET ANSWER BY ID - does not work
// // QuestionSchema.findOne({ 'answers._id': answerId }, { 'answers.$': 1 })
// // app.get("question/questionId/answer/:_id", async (req, res) => {
// //   const { _id } = req.params
// //   Question.findById({_id})
// //   .then(answer => res.status(200).send(answer))
// //   .catch(err => res.status(500).send(err));
// //   })


// Question.updateOne({ _id: questionId, 'answers._id': answerId}, {$inc: {'answers.$.likes': 1}})
//   .then(updatedAnswer => {
//     if (updatedAnswer) {
//       res.json({ 
//         success: true,
//         response: `Question ${updatedAnswer.id} has updated likes`,
//         _id: updatedAnswer._id,
//       });
//     } else {
//       res.status(404).json({
//         success: false, 
//         message: 'Could not like answer' })
//     }
//   })
//   .catch(error => {
//     res.status(400).json({ success: false, message: 'Invalid like question request', error })
//   });

// LIKE ANSWER - 
  app.patch('/question/:questionId/answer/:answerId/like', async (req, res) => {
    const { questionId } = req.params
    const { answerId } = req.params
    try {
      const updatedAnswer = await Question.findByIdAndUpdate({ _id: questionId, 'answer._id': answerId}, {$inc: {'answer.$.likes': 1}})
      if (answerId) {
        res.json({ 
          success: true,
          response: `Answer ${answerId} has updated likes`,
          _id: updatedAnswer._id,
        });
      } else {
        res.status(404).json({
          success: false, 
          message: 'Could not like answer' })
      }
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid like question request', error })
    }
  });



  // app.patch('/questions/:answerId/like', async (req, res) => {
  //   const { answerId } = req.params
  //   try {
  //   const updatedAnswer = await Question.findByIdAndUpdate(answer, answerId, {$inc: {likes: 1}},   
  //    )
  //     if (answerId) {
  //       res.json({ 
  //         success: true,
  //          response: `Question ${updatedAnswer.id} has updated likes`,
  //         _id: updatedAnswer._id,
  //       });
  //     } else {
  //       res.status(404).json({
  //          success: false, 
  //          message: 'Could not like question' })
  //     }
  //   } catch (error) {
  //     res.status(400).json({ success: false, message: 'Invalid like question request', error })
  //   }
  // })




  // ANSWER BY ID -response in console
app.get('/question/:question_id/answer/:answer_id', function(req, res){
  Question.findById(req.params.question_id, function(err, Questions) {
    console.log(req.params.answer_id);
    var doc = Questions.answers.id(req.params.answer_id);
    console.log(doc);
  });
});


// GET QUESTION by QUESTION ID
app.get("/questions/id/:_id", async (req, res) => {
  const { _id } = req.params
  try {
    // const questionById=await Question.findById({questionID: req.params._id})
  if(_id) {
    const questionById =await Question.findById({_id});
    res.status(200).json({
      data: questionById,
      success: true,
    })
  } else {
    res.status(404).json({
      error: 'No question with that question ID was found.',
      success: false,
    })
  }
  } catch(error) {
    res.status(400).json({
      error: 'Invalid question ID',
      success: false,
    })
  }
  })

// POST QUESTION BY AUTH USER - SECURE
app.post("/questions",  async (req, res) => {
  const { message } = req.body;
 // const { _id } = req.user
  try {
    const newQuestion = await new Question({
      message,
      //user: _id,
    }).save();
    if (newQuestion) {
      res.status(201).json({
        success: true, 
       // response: newQuestion,
        response: {
        _id: newQuestion._id,
         message: newQuestion.message,
         likes: newQuestion.likes,
         disLikes: newQuestion.disLikes,
         answer: newQuestion.answers
       }
      });
    }
  } catch (error) {
    res.status(400).json({
        success: false, 
        response: error
    });
  }
});

//PATCH ANSWER TO A QUESTION : WORKS IN POSTMAN; SET AUTH KEY VALUE AND BODY: "ANSWER".
app.patch('/questions/:questionId/answer', async (req, res) => {
  const { questionId } = req.params
  const { answer } = req.body
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
      $push: {
        answers: {
          answer,
          //user:_id
        }}}, {new: true} //new give the updated object
    )
    if (updatedQuestion) {
      res.status(201).json({
        success: true,
        question: {
         // response: `Question ${updatedQuestion.answers} it is updated`,
          _id: updatedQuestion._id,
          message: updatedQuestion.message,
          answer: updatedQuestion.answers,
          createdAt: updatedQuestion.createdAt,
          user: updatedQuestion.user,
        }
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not answer post' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})



//https://attacomsian.com/blog/mongoose-increment-decrement-number
//PATCH LIKES TO QUESTION
app.patch('/questions/:questionId/like', async (req, res) => {
  const { questionId } = req.params
  try {
  const updatedQuestion = await Question.findByIdAndUpdate(questionId, {$inc: {likes: 1}},  
  // {_id: questionId},  
   )
    if (updatedQuestion) {
      res.json({ 
        success: true,
         response: `Question ${updatedQuestion.id} has updated likes`,
        _id: updatedQuestion._id,
      });
    } else {
      res.status(404).json({
         success: false, 
         message: 'Could not like question' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid like question request', error })
  }
})

//PATCH DISLIKE TO QUESTION
app.patch('/questions/:questionId/dislike', async (req, res) => {
  const { questionId } = req.params
  try {
  const updatedQuestion = await Question.findByIdAndUpdate( 
    { _id: questionId }, 
    { $inc: {disLikes: 1}}, 
    { new: true} 
   )
    if (updatedQuestion) {
      res.json({
        success: true,
        question: {
          _id: updatedQuestion._id,
          message: updatedQuestion.message,
          disLikes: updatedQuestion.disLikes,
          createdAt: updatedQuestion.createdAt
        }
      })
    } else {
      res.status(404).json({
         success: false,
          message: 'Could not dislike question' })
    }
  } catch (error) {
    res.status(400).json({
       success: false, 
       message: 'Invalid dislike question request', error })
  }
})



// DELETE QUESTION BY ID
app.delete('/questions/:questionId/delete', async (req, res) => {
  const { questionId } = req.params
  try {
    const deletedQuestionById = await Question.findByIdAndDelete(questionId)
    if (deletedQuestionById) {
      res.json({
        success: true, deletedQuestionById,
        message: 'Question is deleted'
      })
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Question with this ID could not be deleted'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid delete question request', error })
  }
})

// // DELETE ANSWER BY ID
// app.delete('/questions/answers/:answerId/:questionId', async (req, res) => {
//   const { answerId, questionId } = req.params
//   try {
//     //or find oneand update // 1. find the question, 2. pull correct answer from answerslist
//     const deletedAnswerById = await Question.findByIdAndUpdate(questionId, {$pull: {answers: {_id: answerId}}})
//     console.log(deletedAnswerById, 'deletetd answer')
//     if (deletedAnswerById) {
//       res.json({
//         success: true, deletedAnswerById,
//         message: 'Question is deleted'
//       })
//     } else {
//       res.status(404).json({ 
//         success: false, 
//         message: 'Answer with this ID could not be deleted'
//       })
//     }
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: 'Invalid delete answer request', error })
//   }
// })

//THIS DELETE THE ENTIRE QUESTION........
app.delete('/questions/answers/:answerId/:questionId', async (req, res) => {
  const { answerId, questionId } = req.params
  try {
    const deletedAnswerById = await Question.deleteOne({
      _id: answerId
    })
    if (deletedAnswerById) {
      res.json({
        success: true, 
        message: 'Answer is deleted'
      })
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Answer with this ID could not be deleted'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid delete answer request', error })
  }
})

app.post('/user/update-collection', async (req, res) => {
  const { questionId } = req.params
  const { userId, collections, } = req.body;
  try {
    const savePost = await User.findById(userId, { new: true} )
    if (savePost) {
      res.json({
        success: true, savePost,
        message: 'post saved'
      }), 
       User.collections = collections;
       User.save
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'could not save post'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'invalid request', error })
  }
})

  
// app.post('/user/update-profile', (req, res) => {
//   // Get the user ID and collected object from the request body
//   const { userId, collectedObject } = req.body;
  
//   // Find the user in the database
//   User.findById(userId, (err, user) => {
//     if (err) {
//       return res.status(400).json({
//         success: false,
//         message: 'Error finding user'
//        });
//     }
//     // Update user's profile with the collected object
//     user.collectedObject = collectedObject;
//     // Save the updated user
//     user.save((err, updatedUser) => {
//       if (err) {
//         return res.status(400).json({
//            success: false, message: 'Error saving user' 
//           });
//       }
//       // Return the updated user
//       return res.status(200).json({ 
//         success: true,
//          user: updatedUser
//        });
//       })
//     })
//   })





    
app.get("/", (req, res) => {
  res.send("Final Project backend");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


////////////////////////////////////////////////////////////////////////////////////////////////////

// req body: data sent from client to  my API
// res body: data my API sends to client

// To Do:
// POST answer by admin
// POST/GET COLLECTIONS Save() questions to collections
// DELETE Question by user and admin

// // USER BY ID: HERE I GET THE ITEMS... but not the rights user, but the first one in list
// app.get("/users/id/:id", async (req, res) => {
//   try {
//     const userById=await User.findOne({user_ID: req.params.user_ID})
//   if(userById) {
//     res.status(200).json({
//       data: userById,
//       success: true,
//     })
//   } else {
//     res.status(404).json({
//       error: 'No user with that user ID was found.',
//       success: false,
//     })
//   }
//   } catch (err) {
//     res.status(400).json({
//       error: 'Invalid user ID',
//       success: false,
//     })
//   }
//   })

//authorization admin
// // next = callback function
// const authenticateAdmin = async (req, res, next) => {
//   const accessToken = req.header("Authorization");
//   try {
//     const admin = await Admin.findOne({accessToken: accessToken});
//     if (admin) {
//       next();
//     } else {
//       res.status(401).json({
//         response: "Please log in as admin",
//         success: false
//       })
//     }
//   } catch (error) {
//     res.status(400).json({
//       response: error,
//       success: false
//     })
//   }
// }

// // DOES NOT WORK - (REGEX)
// // GET USER BY USER _ID
// app.get("/users/:_id", async (req, res)=> {
//     const { _id } = req.params
//     try {
//     if (_id) {
//       const userProfile = await User.findById({_id}).exec();
//       const collection = []
//       for (const question of userProfile.collections) {
//         const questionObject = await Question.findById(question)
//         collections.push(questionObject)
//       }
//     }
//       res.json({
//         success: true, 
//         username: userProfile.username, 
//         roles: userProfile.roles,
//         id: userProfile._id,
//         collections: userProfile.collections
//       })
//   } catch (error) {
//     res.status(404).json({
//         success: false,
//         message: 'Can not find ',
//         error});
//   }
//   });

// DELETE QUESTION BY USER(ID) OR ADMIN
// app.delete('/users/:_id', authenticateUser, authenticateAdmin)
// app.delete('/users/:_id', async (req, res) => {
//   const { _id } = req.params
// })

// //GET ALL ADMINS - works
// app.get("/admins", async (req, res)=> {
//   const admins = await Admin.find({});
//   res.status(200).json({
//     success: true, 
//     message: "all admins", 
//     response: admins});
// });

// // ADMIN REGISTRATION ENDPOINT - works
// app.post("/registeradmin", async (req, res) => {
//   const { adminname, password } = req.body;
//   try {
//     const salt = bcrypt.genSaltSync();
//     if (password.length < 3) {
//       res.status(400).json({
//         success: false,
//         response: "Password must be at least 3 characters long"
//       });
//     } else {
//       const newAdmin = await new Admin ({adminname: adminname, password: bcrypt.hashSync(password, salt)}).save();
//       res.status(201).json({
//         success: true,
//         response: {
//           adminname: newAdmin.adminname,
//           accessToken: newAdmin.accessToken,
//           id: newAdmin._id
//         }
//       });
//     }
//   } catch(error) {
//       res.status(400).json({
//         success: false,
//         response: error
//       });
//   }
// });