const Book=require('../model/Book');
const User=require('../model/User');
const jwt = require("jsonwebtoken");
const getAlluser=async(req,res)=>{
   
    try {
      const userData=await User.find()
        
      if(!userData){
          return res.status(404).json({message:"No Products Found"})
      }
         return res.status(200).json({userData})
    } catch (error) {
        console.log(error.message);
    }
    
}

const getProfile=async(req,res,next)=>{
      try {
     
      if (!req.cookies || !req.cookies.jwt) {
         
          return res.status(401).json({ error: "Unauthorized" });
        } 
        
          const jwtToken = req.cookies.jwt.token;
          const decodetoken = jwt.verify(jwtToken, "secretCodeforUser");
 
          const userId = decodetoken.id;
          try{
          const user = await User.findOne({ _id: userId });
          console.log(user,'uuuuserrrrrrrrrrrr');
           
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          } 
            return res.status(200).json({ user });
          } catch (error) {
            return res.status(500).json({ error: "Database error" });
          }
       
      } catch (error) {
        return res.status(403).json({ error: "Token verification failed" });
      }
    }

   const editProfile=async(req,res)=>{
      try {
          console.log("hello");
         const jwtToken = req.cookies.jwt.token;
         const decode=jwt.verify(jwtToken,"secretCodeforUser")
         console.log(decode);
          if(!decode.id){
              throw new Error("Invalid Token")
          }
          const userData = await User.findOne({_id:decode.id})
  
          if(!userData){
              throw new Error("User not found")
          }
          console.log('fileeeeeee',req.file);
          if(req.file&&req.file.path){
              userData.image=req.file.filename;
              console.log(userData);
              const url =req.file.path;
              await userData.save()
              console.log("success")
              res.status(200).send({success:true,url})
          }else{
              throw new Error("No image is there")
          }
          
      } catch (error) {
          res.status(500).json({error:'Internal server error'});
      }
    }


const userLogin=async(req,res)=>{
   
   
    try {
        let userLogin = {
            Status: false,
            message: null,
            token: null,
            name: null,
          };
        const {email,password}=req.body
       const userData=await User.findOne({email:email,password:password});
      console.log(userData);
        if(userData!=null){
            console.log('hellooooo');
            userLogin.Status = true;
            const userName = userData.fname + " " + userData.lname;
           console.log(userName);
            userLogin.name = userName;
            let token = jwt.sign({ id: userData._id }, "secretCodeforUser", {
              expiresIn: "30d",
            });
            userLogin.token = token;
            let obj = {
              token,
              userName,
            };
           
            res.cookie("jwt", obj, {
                httpOnly: false,
                maxAge: 6000 * 1000,
              })
              .status(200)
              .send({ userLogin });
             
         }else {
            userLogin.message = "Email or Password Mismatch";
            res.send({ userLogin });
          }
       
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const updateuser=async(req,res)=>{
    try {
        const id=req.params.id;
        const{name,lastname,email,Mobile,password}=req.body
        const userData=await User.findByIdAndUpdate(id,{
            name,lastname,email,Mobile,password
        })
        const userDatas=await userData.save()
        if(!userDatas){
            return res.status(404).json({message:"unable to update"}) 
         }
        return res.status(200).json({userDatas})
        
    } catch (error) {
        console.log(error.message)
    }
}
        


const usersignup=async(req,res)=>{
    try {
        let userSignUp = {
            Status: false,
            message: null,
          };
   
        const{fname,lname,email,password}=req.body
        let userexist = await User.findOne({ email: email });
      
        if (!userexist) {

            User.create({
                fname,lname,email,password
              }).then((data) => {
                userSignUp.Status = true;
                res.send({ userSignUp });
              });
    
    } else {
        userSignUp.message = "Email Already Exists";
        res.send({ userSignUp });
      }

    } catch (error) {
        console.log(error.message);
        
    }

}

// exports.getAllBooks=getAllBooks;
module.exports={
    getAlluser,
    usersignup,
    getProfile,
    updateuser,
    userLogin,
    editProfile
}