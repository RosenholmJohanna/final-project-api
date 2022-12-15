import express from "express";
import cors from "cors";
import crypto from "crypto"
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.set('strictQuery', true); //due warning mongoose 7
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//shows the available endpoints
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
});

// ROUTES & ENDPOINTS
// GET /users : all users
// GET /user/:username : get profile by username
// POST /register: new user
// POST /login : already user
// GET /questions : all questions
// POST /questions : post a question

// TO CREATE:
// GET QUESTIONS BY USER_ID
// GET QUESTIONS BY QUESTION_ID

// USER SCHEMA
const UserSchema = new mongoose.Schema({
  // admin: {
  //   type: Boolean,
  //   default: false
  // },
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
  item: {
    type: []
  }
});

// USER MODEL
const User = mongoose.model("User", UserSchema);

//GET ALL USERS
app.get("/users", async (req, res)=> {
  const users = await User.find({});
  res.status(200).json({success: true, message: "all users", response: users});
});

// GET USER BY USERNAME
app.get("/user/:username", async (req, res)=> {
  const {username} = req.params
  try {
    const Profile = await User.findOne({username}).exec();
    res.json({
      success: true, username: Profile.username, roles: Profile.roles, id: Profile._id,
    })
} catch (error) {
  res.status(400).json({success: false, message: 'Can not find user ', error});
}
});


// USER REGISTRATION ENDPOINT
// this sent to the browser what we get
app.post("/register", async (req, res) => {
  const { username, password, roles } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 3) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 3 characters long"
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt), roles: roles}).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
          roles: newUser.roles
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

// 500 server error
//403 forbidden auth
// PATCH likes
// DELETE
//COLLECT

//// AUTHORIZATION USER
// next = callback function
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
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

// ADMIN SCHEMA
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

// ADMIN MODEL
const Admin = mongoose.model("Admin", AdminSchema);

//GET ALL ADMINS
app.get("/admins", async (req, res)=> {
  const admins = await Admin.find({});
  res.status(200).json({success: true, message: "all admins", response: admins});
});

// ADMIN REGISTRATION ENDPOINT
app.post("/register", async (req, res) => {
  const { adminname, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 3) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 3 characters long"
      });
    } else {
      const newAdmin = await new ({adminname: adminname, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          adminname: newAdmin.adminname,
          accessToken: newAdmin.accessToken,
          id: newAdmin._id
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

//// AUTHORIZATION ADMIN
// next = callback function
const authenticateAdmin = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const admin = await Admin.findOne({accessToken: accessToken});
    if (admin) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in as admin",
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


// QUESTIONS SCHEMA
const QuestionSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => new Date() 
  },
  likes: {
    type: Number,
    default: 0
   },
  user: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
  },
  isCollected: {
    type: Boolean,
    //default: false
  },
  answer: {
    type: String,
  }
}); 

// QUESTIONS MODEL
 const Question = mongoose.model("Question", QuestionSchema);


  // GET ALL QUESTIONS FROM ALL USERS, secure endpoint - must be logge in to see
app.get("/questions", authenticateUser, authenticateAdmin);
app.get("/questions", async (req, res)=> {
  const questions = await Question.find({});
  res.status(200).json({success: true, response: questions}); //message: "all questions"
});


// // POST NEW QUESTION BY USER
app.post("/questions", authenticateUser,) //authenticateAdmin
app.post("/questions", async (req, res) => {
  const { message, answer } = req.body;
  try {
    const newQuestion = await new Question({message, answer}).save();
    res.status(201).json({success: true, response: newQuestion});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});

app.get("/", (req, res) => {
  res.send("Final Project backend");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
