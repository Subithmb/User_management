import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { userApi } from "../../../Store/Api";

function Profile() {

  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [edited,setEdited]=useState(0)
  const [preview, setPreview] = useState("");
  const[error,setError]=useState("")
  useEffect(() => {
    
    axios.get(`${userApi}profile`, { withCredentials: true })
      .then((response) => {
      console.log('1231313',response.data?.user?.image);
        setUserData(response.data.user);
        setOpen(response.data?.user?.image)
        // setImage(response.data.user.image)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [edited]);
  console.log(open, "user heRE");
  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
    const url = URL.createObjectURL(file);

     setImage(file);
     setPreview(url)
     setOpen(false)
    }
  };
  const submitUpdates = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image);

    axios.post(`${userApi}editProfile`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((response)=>{
     
      setOpen(response.data?.url)
      setEdited(1)
      setError(response.data?.message)
    
    }).catch((error)=>{
      console.log(error);
      setError("failed")
    })
  };

  return (
    <div className="profile-wrapper ">
      <div className="card">
        <div className="card-info">

        {open ? (
          <div className="card-avatar">
            <img style={{ width: "10rem" }} src={`${userApi}profileImages/${userData?.image}`} alt="profile Image" />
            {/* <img style={{ width: "10rem" }} src="data:image/jpeg;base64,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" alt="profile Image" /> */}
          </div>
        ) : (
          <img style={{ width: "10rem", paddingBottom: "1rem" }} src={preview} alt="profile Image" />
        )}
         
            <input
              type="file"
              id="myFile"
              className="file-input"
              onChange={handleImage}

            />
           
     
          <label htmlFor="myFile" className="mb-2">
            Upload Image
          </label>
          <div className="card-title">
            {userData ? `${userData.fname} ${userData.lname}` : ""}
          </div>
          <div className="card-subtitle">{userData ? userData.email : ""}</div>
        </div>
        <button className="btn btn-primary mt-3" onClick={submitUpdates}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;
