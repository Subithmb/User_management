import React,{useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import {useCookies} from "react-cookie"
import { useDispatch,useSelector } from 'react-redux'
import { UserActions } from '../Store/userAuth'
import Home from '../pages/User/Home'
import Login from '../pages/User/Login'
import Register from '../pages/User/Register'
import Profile from '../pages/User/Profile'

function User() {
    const [cookies]=useCookies(['jwt'])
    const dispatch = useDispatch();
    useEffect(()=>{
        if(cookies.jwt){
          
            dispatch(UserActions.userAddDetails({name:cookies.jwt.userName,token:cookies.jwt.token}))
        }
    },[cookies.jwt,dispatch])
    
    const userToken = useSelector((state)=>state.user.userToken)
    console.log('tokennnnnn',userToken);
  return (
    <div>
        <Routes>
            <Route path='/' element={userToken?<Home/>:<Login/>}/> 
            <Route path='/login' element={userToken ? <Home/> : <Login/>}/>
            <Route path='/signup' element={userToken ? <Home/> : <Register/>}/>
            <Route path='/profile' element={userToken ? <Profile/> : <Home/>}/>
        </Routes>
    </div>
  )
}

export default User
