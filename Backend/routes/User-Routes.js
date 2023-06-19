

const express = require('express');
const userRouter = express.Router();
const Book = require('../model/Book');
const User = require('../model/User');
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname,"../public/profileImages"), function(error, success) {
      if (error) {
        console.log(error);
      }
    });
  },
  filename: function(req, file, cb) {
    const name = Date.now()+"-"+file.originalname;
    cb(null, name, function(error, success) {
      if (error) {
        console.log(error);
      }
    });
  }
});

// Define the upload variable
const upload = multer({ storage: storage });

const userController = require('../controllers/User-controller');
userRouter.post('/signup', userController.usersignup);
userRouter.get('/', userController.getAlluser);
userRouter.post('/login', userController.userLogin);
userRouter.get('/profile', userController.getProfile);

// Use the upload middleware for the '/editProfile' route
userRouter.post("/editProfile",upload.single('image'), userController.editProfile);

userRouter.put('/:id', userController.updateuser);

module.exports = userRouter;
