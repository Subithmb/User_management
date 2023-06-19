const mongoose=require("mongoose"); 
const { required } = require('nodemon/lib/config');
// user sign-up schema

const userSchema = new mongoose.Schema({
    fname: {
      type: "String",
      required: true
    },
    lname: {
      type: "String",
      required: true
    },
     email: {
      type: "String",
      required: true
    },
   
    password: {
      type: "String",
      required: true
    },
    
    status: {
      type: "boolean",
      default:false
    },
    image:{
        type:String,
        
    }
  });


 module.exports = mongoose.model("User",userSchema);
  