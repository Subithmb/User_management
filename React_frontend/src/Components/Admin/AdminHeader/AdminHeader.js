import React from "react";
import { useNavigate } from "react-router";
import "./AdminHeader.css";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { AdminAction } from "../../../Store/AdminAuth";

function AdminHeader() {
    const dispatch = useDispatch();
    const [cookie, setCookie, removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate();
  
    const UserLogout = () => {
      console.log('log outtt');
     
      removeCookie('jwt');
      dispatch(AdminAction.AdminLogout());
      navigate('/admin');
    };

  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <button
            style={{ background: "white" }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                onClick={() => {
                  navigate('/admin' );
                }}
                className="nav-item"
              >
                <p
                  style={{ color: "black",fontWeight:"bold" }}
                  id="home"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </p>
              </li>
            </ul>
          </div>
          <button onClick={UserLogout} type="button" className="btn btn">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default AdminHeader;
