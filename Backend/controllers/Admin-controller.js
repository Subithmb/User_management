const Admin=require('../model/Admin')
const User=require('../model/User');
const jwt = require("jsonwebtoken");
const addAdmin=async(req,res)=>{
    try {
       
        const{name,email,password}=req.body
      const  adminData=new Admin({
        name,email,password
        })
        await adminData.save();
        
        if(!adminData){
           return res.status(500).json({message:"unable to add admin"}) 
        }
       return res.status(201).json({adminData})
    } catch (error) {
        console.log(error.message);
        
    }}

    
    const getAdminData=async(req,res)=>{
       
        try {
           const adminData=await Admin.findOne()
            
           if(adminData !=null){
               return res.status(404).json({message:"Admin Not Found"})
           }
              return res.status(200).json({adminData})
        } catch (error) {
            console.log(error.message);
        }
         }

         const addUser=async(req,res)=>{
            try {
               
                const{name,lastname,email,Mobile,password}=req.body
              const  userData=new User({
                name,lastname,email,Mobile,password
                })
              const userDatas= await userData.save();
                
                if(!userDatas){
                   return res.status(500).json({message:"unable to add"}) 
                }
               return res.status(201).json({userDatas})
            } catch (error) {
                console.log(error.message);
                
            }
        
        }
         const getAllUsers=async(req,res)=>{
          
            try {
                const userData=await User.find()
                
                if(!userData){
                    return res.status(404).json({message:"No users Found"})
                }
                   return res.status(200).json({userData})
            } catch (error) {
                console.log(error.message);
            } 
        }

        const userGetById=async(req,res)=>{
           
            
            try {
                const id=req.params.userid
               const userData=await User.findById(id);
                if(!userData){
                    return res.status(404).json({message:"user not found"}) 
                 }
                return res.status(200).json({userData})
                
            } catch (error) {
                console.log(error.message);
                
            }
        }


        
const userUpdation=async(req,res)=>{
    // try {
    //     const id=req.params.userid
       
    //     const{name,lname,email}=req.body
    //     const userData=await User.findByIdAndUpdate(id,{
    //         name,lname,email
    //     } )
    //     const userDatas=await userData.save()
    //     console.log(userDatas);
    //     if(!userDatas){
    //         return res.status(404).json({message:"unable to update"}) 
    //      }
    //     return res.status(200).json({userDatas})
        
    // } catch (error) {
    //     console.log(error.message)
        
    // }
    const obj = {
        message: null,
        edited: null,
      };
    //   console.log(req.cookies);
    //   const jwtToken = jwt.verify(req.cookies.jwt.AdminToken, "Secretcode");
    //   if (jwtToken) {
        if(req.params.userid){
        const id=req.params.userid
        const {  fname,lname, email } =req.body;
        const userData = await User.findById(id);
        if (userData) {
          User.updateOne(
            { _id: id },
            {
              $set: {
                fname,lname, email
              },
            }
          ).then(() => {
              obj.edited = true;
              res.status(200).send(obj);
              
          });
        } else {
          obj.message = "User not there";
        }
      }

}

const deleteUser=async(req,res)=>{
    try {
        const id=req.params.userid
        console.log(id);
        await User.deleteOne({ _id:id }).then(() => {
            console.log("deleted...");
            res.sendStatus(200);
          });

        
    } catch (error) {
        console.log(error.message);
        
    }
}

const adminLogin=async(req,res)=>{
   
   
    try {
        let adminSignup = {
            Status: false,
            message: null,
            token: null,
            name: null,
          };
        const {email,password}=req.body
       const adminData=await Admin.findOne({email:email,password:password});
    
        if(adminData){
            
           
      adminSignup.Status = true;
      adminSignup.name = adminData.name;
      // const Adminname = adminData[0].name
      let AdminToken = jwt.sign({ id: adminData._id }, "Secretcode", {
        expiresIn: "24h",
      });
      adminSignup.token = AdminToken;
      let obj = {
        AdminToken,
      };
      res
        .cookie("jwt", obj, {
          httpOnly: false,
          maxAge: 6000 * 1000,
        })
        .status(200)
        .send({ adminSignup })
         }
       else{
       
        adminSignup.message = "Your Email or Password wrong";
      adminSignup.Status = false;
      res.send({ adminSignup });
       }
        
    } catch (error) {
        console.log(error.message);
        adminSignup.Status = false;
        adminSignup.message = error;
        res.send({ adminSignup });
        
    }
}


module.exports={
    addAdmin,
    getAdminData,
    getAllUsers,
    userGetById,
    userUpdation,
    deleteUser,
    addUser,
    adminLogin
}