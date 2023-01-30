import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { QuestionSchema } from "./models/questionModel"
import { UserSchema } from "./models/userModel";

const Question = mongoose.model("Questions", QuestionSchema);
const User = mongoose.model("User", UserSchema);


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to the Database successfully')
}); mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/endpoints", (req, res) => {
    res.send(listEndpoints(app))
  });

  //GET ALL USERS
  app.get("/users", async (req, res)=> {
    const users = await User.find({});
    res.status(200).json({
      success: true, 
      response: users
    });
  });

// GET USER BY USERNAME
app.get("/users/:username", async (req, res)=> {
  const {username} = req.params
  try {
    const Profile = await User.findOne({username}).exec();
    res.json({
      success: true, 
      username: Profile.username, 
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


// USER REGISTRATION 
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

// USER LOGIN 
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

// AUTHORIZATION USER
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
app.get('/answers', (req, res) => {
  Question.find({}, { answers: 1, _id: 0 })
    .then(answer => res.status(200).send(answer))
    .catch(err => res.status(500).send(err));
});

// ANSWER BY ID 
app.get('/question/:question_id/answer/:answer_id', function(req, res){
  Question.findById(req.params.question_id, function(err, Questions) {
    console.log(req.params.answer_id);
    var doc = Questions.answers.id(req.params.answer_id);
    console.log(doc);
  });
});

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

// POST QUESTION BY AUTH USER 
app.post("/questions", authenticateUser, async (req, res) => {
  const { message } = req.body;
  try {
    const newQuestion = await new Question({
      message,
    }).save();
    if (newQuestion) {
      res.status(201).json({
        success: true, 
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

//PATCH ANSWER TO A QUESTION 
app.patch('/questions/:questionId/answer', async (req, res) => {
  const { questionId } = req.params
  const { answer } = req.body
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
      $push: {
        answers: {
          answer,
        }}}, {new: true} 
    )
    if (updatedQuestion) {
      res.status(201).json({
        success: true,
        question: {
         response: `Question ${updatedQuestion.answers} it is updated`,
          _id: updatedQuestion._id,
          message: updatedQuestion.message,
          answer: updatedQuestion.answers,
          createdAt: updatedQuestion.createdAt,
        }
      })
    } else {
      res.status(404).json({ success: false, message: 'Could not answer post' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})


//PATCH LIKES TO QUESTION
app.patch('/questions/:questionId/like', async (req, res) => {
  const { questionId } = req.params
  try {
  const updatedQuestion = await Question.findByIdAndUpdate(questionId, {$inc: {likes: 1}},  
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

    
app.get("/", (req, res) => {
  res.send("Final Project backend");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
