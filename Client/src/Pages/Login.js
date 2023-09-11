import React, { useEffect, useState, useContext } from "react";
//
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//
// context
import { CartContext } from "../App";
import Swal from "sweetalert2";
export default function Register() {
  const { loginUserData, setLoginUserData } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // store data in DB
    console.log("LoginUserData", loginUserData);
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include",
        body: JSON.stringify(loginUserData),
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Logged In",
          text: "You have successfully logged in!",
        }).then(() => {
          navigate("/home");
        });
      } else {
        console.log("CAnt")
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password!",
        });
      }
    } catch (error) {
      console.log("Errro whiel store user data", error);
    }
  };

  useEffect(() => {
    document.title = "FoodEase - register";
  }, []);

  return (
    <div className="mainRegisterContainer">
      <div className="regContainer">
        <div className="leftInner">
          <h2>
            Welcome back to <span className="regLogo">FoodEase</span>
          </h2>
          <p>Savor the simplicity of ordering your favorite meals online.</p>
          <div className="inputContainer">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* <div className="form-group">
                <label for="exampleFormControlInput1">Name</label>
                <input
                  type="text"
                  name="uname"
                  className="form-control textFiled"
                  id="exampleFormControlInput1"
                  placeholder="Enter your name..."
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </div> */}
              <div className="form-group">
                <label for="exampleFormControlInput2">Email Address</label>
                <input
                  type="email"
                  name="uemail"
                  className="form-control textFiled"
                  id="exampleFormControlInput2"
                  placeholder="Enter your Email..."
                  onChange={(e) => {
                    setLoginUserData({
                      ...loginUserData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput3">Password</label>
                <input
                  type="string"
                  name="upass"
                  className="form-control textFiled"
                  id="exampleFormControlInput3"
                  placeholder="Your password..."
                  onChange={(e) => {
                    setLoginUserData({
                      ...loginUserData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <p>
                Don't have an account? <NavLink to={"/"}>Register</NavLink>
                <br /><br/>
                Login as Admin
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => navigate("/admin/login")}
                >
                  Login
                </span>
              </p>
              <Button
                style={{
                  border: "none",
                  backgroundColor: "#ffe1aa",
                  color: "black",
                }}
                variant="contained"
                className="signupBtn mt-3"
                onClick={() => {
                  handleSubmit();
                }}
              >
                LOG-IN <ExitToAppIcon />
              </Button>
            </form>
          </div>
        </div>
        <div className="rightInner">
          <div className="regImageCon">
            <img
              src="https://img.freepik.com/premium-photo/indian-lunch-dinner-main-course-food-group-includes-paneer-butter-masala-dal-makhani-palak-paneer-roti-rice-etc-selective-focus_466689-6844.jpg?size=626&ext=jpg&ga=GA1.2.1554118537.1685102464&semt=sph"
              alt=""
              style={{ paddingLeft: 27 }}
              className="regBackImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
