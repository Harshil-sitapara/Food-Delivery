import React, { useEffect, useState, useContext } from "react";
//
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//
import regback4 from "../../src/assets/images/regBack4.png";
// context
import { CartContext } from "../App";
export default function Register() {
  const { setUserData, userData } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // store data in DB
    console.log("userData", userData);
    try {
      const result = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      navigate("/login");
    } catch (error) {
      console.log("Errro whiel store user data", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!userData.uname) {
      alert("Name is required");
      return;
    }
    if (!userData.uemail) {
      alert("Email is required");
      return;
    }
    if (!userData.upass) {
      alert("Password is required");
      return;
    }
  }
  useEffect(() => {
    document.title = "FoodEase - register";
  }, []);

  return (
    <div className="mainRegisterContainer">
      <div className="regContainer">
        <div className="leftInner">
          <h2>
            Welcome to <span className="regLogo">FoodEase</span>
          </h2>
          <p>
            Experience the joy of dining at your fingertips, with FoodEase..
          </p>
          <div className="inputContainer">
            <form
              onSubmit={(e) => {
                handleFormSubmit(e)
              }}
            >
              <div className="form-group">
                <label for="exampleFormControlInput1">Name</label>
                <input
                  required
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
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput2">Email Address</label>
                <input
                  type="email"
                  name="uemail"
                  className="form-control textFiled"
                  id="exampleFormControlInput2"
                  placeholder="Enter your Email..."
                  onChange={(e) => {
                    setUserData({
                      ...userData,
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
                  placeholder="Set your password..."
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <p>
                Already have an accouny? <NavLink to={"/login"}>Login</NavLink>
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
                Sign up <ExitToAppIcon />
              </Button>
            </form>
          </div>
        </div>
        <div className="rightInner">
          <div className="regImageCon">
            <img src={regback4} alt="" className="regBackImg" />
          </div>
        </div>
      </div>
    </div>
  );
}
