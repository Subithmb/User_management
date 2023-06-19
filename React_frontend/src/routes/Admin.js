// import React,{useEffect} from 'react'
// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
// import AdminLogin from "../pages/Admin/AdminLogin"
// import { useCookies } from 'react-cookie'
// import { useDispatch, useSelector } from 'react-redux'
// import { AdminAction } from '../Store/AdminAuth'
// import AdminHome from '../pages/Admin/AdminHome'
// import AdminEdit from '../pages/Admin/AdminEdit'

// function Admin() {
//     const [cookies,setcookies]=useCookies(['jwt'])
//     const dispatch =useDispatch()
//     console.log(AdminAction.AddAdmin({token:cookies?.jwt?.AdminToken}),"oooyaa");
//     useEffect(()=>{
//         if(Object.keys(cookies).length>0){
//             dispatch(AdminAction.AddAdmin({token:cookies?.jwt?.AdminToken}))
//         }
//     },[])
//     let Admin = useSelector(state=>{return state.Admin.AdminToken})
//   return (
//     <div>
//         <Routes>
//                 <Route path='/' element={Admin ?<AdminHome/> :<AdminLogin/>}/>
//                 <Route path='/AdminLogin'  element={Admin ? <AdminHome/> : <AdminLogin/>} />
//                 <Route path='/editUser' element={Admin ? <AdminEdit/> : <AdminLogin/>}/>
//         </Routes>
      
//     </div>
//   )
// }

// export default Admin







import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from '../pages/Admin/AdminLogin';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AdminAction } from '../Store/AdminAuth';
import AdminHome from '../pages/Admin/AdminHome';
import AdminEdit from '../pages/Admin/AdminEdit';
import AdminLoginPage from '../pages/Admin/AdminLogin';
import Adduser from '../Components/Admin/AdminAddUser/Adduser';

function Admin() {
  const [cookies, setCookies] = useCookies(['jwt']);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(cookies).length > 0) {
      dispatch(AdminAction.AddAdmin({ token: cookies?.jwt?.AdminToken }));
    }
  }, [dispatch]);

  const adminToken = useSelector((state) => state.Admin.AdminToken);
  console.log('admmmmmmmmmmmmmmmmmmm',adminToken);

  return (
    <div>
            <Routes>
                    <Route path='/' element={adminToken ? <AdminHome/> :<AdminLogin/>}/>
                    <Route path='/adminhome' element={adminToken ?<AdminHome/> :<AdminLogin/>}/>
                    {/* <Route path='/adminlogin' element={<AdminLogin/>}/> */}
                    {/* <Route path='/AdminLogin'  element={Admin ? <AdminHome/> :<AdminLogin/>} /> */}
                    <Route path='/editUser' element={adminToken ? <AdminEdit/> : <AdminLogin/>}/>
                    <Route path='/adduser' element={adminToken ? <Adduser/> : <AdminLogin/>}/>
            </Routes>
            {/* <Routes>
                    <Route path='/' element={Admin ?<AdminHome/> :<AdminLogin/>}/>
                    <Route path='/adminlogin' element={<AdminLogin/>}/>
                    <Route path='/AdminLogin'  element={Admin ? <AdminHome/> :<AdminLogin/>} />
                    <Route path='/editUser' element={Admin ? <AdminEdit/> : <AdminLogin/>}/>
            </Routes> */}
          
    </div>
  );
}

export default Admin;
