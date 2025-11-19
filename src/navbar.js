import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LOGO from "./BuildMyPClogo.png";
import "./navbar.css";
import { FaShoppingCart, FaUserCircle,FaBars } from "react-icons/fa"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({});
  const [open, setOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // ✅ better naming
  const [menuOpen,setMenuOpen]=useState(false)


  function profileDetailsDiv() {
    setOpen(!open);

  }
  
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  setPreview(URL.createObjectURL(file));

  const formData = new FormData();
  formData.append("profile", file);

  axios.post("http://localhost:4000/profileImage", formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" }
  })
  .then(res => {setPreview(res.data.ImageURL)})
  .catch(err => console.log(err));
};


  useEffect(() => {
    axios.get("http://localhost:4000/logincheckProfile",{ withCredentials: true })
      .then(res => {
        if (res.data.login === "exist") {
          setIsLoggedIn(true);   // ✅ if logged in
        } else {
          setIsLoggedIn(false);  // ✅ if not logged in
        }
      })
      .catch(() => console.error("error"));
  }, []);

    useEffect(() => {
    axios.get("http://localhost:4000/fatchProfileDetails",{ withCredentials: true })
      .then(res => {
        setProfileData({
        username: res.data.UserName,
        email: res.data.Email,
        city: res.data.City,
        state: res.data.State,
        pincode: res.data.Pincode,
        phone: res.data.Phone,
        url:res.data.ImageURL
      });

      })
      .catch(() => console.error("error"));
  }, [preview]);


  function logout(){
    axios.post("http://localhost:4000/loginProductsManage",{},{ withCredentials: true })
    .then(res=>{console.log("done")})
    .catch(error=>{console.log(error)})

    axios.get("http://localhost:4000/logout",{ withCredentials: true })
      .then(res => {
        if(res.data.message==="Logout successful"){
          navigate("/")
          setTimeout(() => window.location.reload(), 0);
        }
          
      })
      .catch(() => console.error("error"));

  }
  function sidebarToggel(){
    setMenuOpen(false)
  }


  return (
    <div className="navbar-div">
      <img src={LOGO} className="navbar-Logo" alt="BuildMyPC Logo" />
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars size={20} />
      </div>
      <div>
        {menuOpen?(
          <div className="toggle-sidebar">
            <ul>
              <li ><Link to="/" onClick={sidebarToggel} >PC Build</Link></li>
              <li ><Link to="/Pre_Build_PC" onClick={sidebarToggel}>Pre-Build PC</Link></li>
              <li ><Link to="/PC_Components" onClick={sidebarToggel} >PC Components</Link></li>
              <li ><Link to="/Peripherals" onClick={sidebarToggel}>PC Peripherals</Link></li>
              <li ><Link to="/chatbot" onClick={sidebarToggel}>AI Powered Bot</Link></li>
            </ul>
          </div>
        
      ):("")}
      </div>
      <div className="main-route">
        <ul>
          <li className="main-route-listItem"><Link to="/">PC Build</Link></li>
          <li className="main-route-listItem"><Link to="/Pre_Build_PC">Pre-Build PC</Link></li>
          <li className="main-route-listItem"><Link to="/PC_Components">PC Components</Link></li>
          <li className="main-route-listItem"><Link to="/Peripherals">PC Peripherals</Link></li>
          <li className="main-route-listItem"><Link to="/chatbot">AI Powered Bot</Link></li>
          
          <li>
            <Link to="/Shoping_cart" className="cart-link">
              <FaShoppingCart className="huihuui" size={20} style={{ marginRight: "5px" }} />
            </Link>
          </li>

          {/* ✅ Profile */}
          <li>
            {!isLoggedIn ? (
              // If not logged in → show signup/login

              <Link to="/signup" className="profileDiv">
                <FaUserCircle  size={22} />
              </Link>
            ) : (
              // If logged in → show profile details
              <div  className="profile-link">
                <FaUserCircle   onClick={profileDetailsDiv} size={22}  />
                <div 
                  style={{
                    height: open ? "320px" : "0px",
                    transition: "height 0.3s ease",
                    contentVisibility: open ? "visible" : "hidden",
                    marginRight:"-10px",
                    backgroundColor:"rgb(240, 242, 244)",
                    boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)"
                  }} 
                  className="profileDetails"
                >
                  <div className="profileImage">
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <img
                      src={`http://localhost:4000${profileData.url}` || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2F1sRrmj0rFgZyVmC8yBgXxyccFRJf7LPQ&s"}
                      alt="uploadimage"
                      onClick={openFilePicker}
                      style={{
                        height: "102%",
                        width: "100%",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="UserProfileDetails">
                    
                    <table>
                      <tr>
                        <td>User :</td>
                        <td>{profileData.username}</td>
                      </tr>
                      <tr>
                        <td>Email :</td>
                        <td>{profileData.email}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>{profileData.state+" "+profileData.city+" "+profileData.pincode}</td>
                      </tr>
                      <tr>
                        <td>Phone :</td>
                        <td>{profileData.phone}</td>
                      </tr>
                      
                      
                    </table>
                    <button className="logoutButton" type="button" onClick={logout} >
                      LogOut
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
