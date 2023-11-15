import React, { useEffect } from "react";
import "../admin.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import BASE_URL from "../../services/Helper"

function AdminNav() {
  const navigate = useNavigate();
  const handleShowProfile = () => {
    Swal.fire({
      title: "Profile",
      html: `
      <div className="profile-container">
      <div className="avatar-container">
        <img alt="Admin Image" src="https://cdn.vectorstock.com/i/preview-1x/34/96/flat-business-man-user-profile-avatar-in-suit-vector-4333496.jpg" />
      </div>
      <div className="profile-details">
        <p>Admin Name: Harshil</p>
        <p>Email: admin123@gmail.com</p>
      <p>Role: Administrator</p>
      </div>
    </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
        handleAdminLogout()
      }
    });
  };

  const handleAdminLogout=async()=>{
    try {
      const title = "adminId"
      const userDataRes = await fetch(`${BASE_URL}/clearCookie${title}`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
      if (userDataRes.ok) {
        navigate("/admin/login");
      } else {
        console.log("Error clearing cookies on logout!");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  }

  useEffect(() => {
    document.title = "FoodEase - Admin";
    const link = document.querySelector("link[rel*='icon']");
    if (link) {
      link.href = "/superDine.png";
    }
  });

  return (
    <div classNameName="admin-nav">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/admin/dashboard">
        <h1 className="adminLogo">FoodEase</h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto navitems">
            <li className="nav-item">
              <NavLink
                className="nav-link navItem"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  background: isActive ? "#e2e2e2" : "#f8f9fa",
                })}
              >
                Dashboard 
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link navItem"
                to="/admin/orders"
                style={({ isActive }) => ({
                  background: isActive ? "#e2e2e2" : "#f8f9fa",
                })}
              >
                Orders 
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link navItem"
                to="/admin/users"
                style={({ isActive }) => ({
                  background: isActive ? "#e2e2e2" : "#f8f9fa",
                })}
              >
                Users 
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link navItem"
                to="/admin/feedback"
                style={({ isActive }) => ({
                  background: isActive ? "#e2e2e2" : "#f8f9fa",
                })}
              >
                Feedback 
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <AccountCircleIcon
              style={{ color: "black", cursor: "pointer", fontSize: 30 }}
              onClick={() => {
                handleShowProfile();
              }}
            />
          </form>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
