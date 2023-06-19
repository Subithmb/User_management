const express=require('express')
const adminRouter=express.Router();
const Admin=require('../model/Admin')
const User=require('../model/User');
const adminController=require('../controllers/Admin-controller')

adminRouter.post('/signup',adminController.addAdmin)
adminRouter.post('/login',adminController.adminLogin)
adminRouter.get('/',adminController.getAdminData)
adminRouter.post('/adduser',adminController.addUser)
adminRouter.get('/alluser',adminController.getAllUsers)
adminRouter.get('/user/:userid',adminController.userGetById)
adminRouter.put('/updateuser/:userid',adminController.userUpdation)
adminRouter.delete('/removeuser/:userid',adminController.deleteUser)
module.exports=adminRouter