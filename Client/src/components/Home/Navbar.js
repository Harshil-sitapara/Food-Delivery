import React, { useContext, useEffect, useRef, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { NavLink, useNavigate } from "react-router-dom";
//
import { CartContext } from "../../App";
import Swal from "sweetalert2";

export default function Navbar() {
  const { cartSize } = useContext(CartContext);
  const [user,setUser]=useState({})
  const headerRef = useRef(0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList?.add("header__shrink");
      } else {
        headerRef.current?.classList?.remove("header__shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //profile
  const handleShowProfile = async() => {
    await handleFetchUserData();
    const swal = Swal.fire({
      title: "Your Profile",
      html: `<div style="display: flex; align-items: center; gap: 10px;">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile" class="profileImg" />
        <div class="prodileinfo">
          <p>Name: ${user.email}</p>
          <p>Email: example@gmail.com</p>
          <p>Location: Suart, Gujarat</p>
        </div>
      </div>
      <button class="logoutButton">Logout</button>
      <button class="cancelButton">Cancel</button>
      `,
      showConfirmButton: false,
    });
    
    document.querySelector(".logoutButton").addEventListener("click", () => {
      handleUserLogoutAndNavigate();
      swal.close();
    });

    document.querySelector(".cancelButton").addEventListener("click", () => {
      swal.close();
    });
  };

  const handleFetchUserData = async () => {
    try {
      const userDataRes = await fetch("http://localhost:8080/user/fetch", {
        method: "GET",
      });
  
      if (userDataRes.ok) {
        const userdata = await userDataRes.json();
        setUser(userdata);
      } else {
        console.log("Error fetching user data:", userDataRes.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };
  

  const handleUserLogoutAndNavigate = async () => {
    try {
      const title = "uid"
      const userDataRes = await fetch(`http://localhost:8080/clearCookie${title}`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
      if (userDataRes.ok) {
        navigate("/");
      } else {
        console.log("Error clearing cookies on logout!");
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  //logout user
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky_nav"
      ref={headerRef}
    >
      <a className="navbar-brand " href="/home">
        <h1 className="logo">FoodEase</h1>
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

      <div
        className="collapse navbar-collapse d-flex"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto menu_item">
          <li className="nav-item active">
            <NavLink
              to="/home"
              className={(navClass) =>
                navClass.isActive ? "nav-link active__menu" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/foods"
              className={(navClass) =>
                navClass.isActive ? "nav-link active__menu" : "nav-link"
              }
            >
              Foods
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/cart"
              className={(navClass) =>
                navClass.isActive ? "nav-link active__menu" : "nav-link"
              }
            >
              Cart
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/myorders"
              className={(navClass) =>
                navClass.isActive ? "nav-link active__menu" : "nav-link"
              }
            >
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/feedback"
              className={(navClass) =>
                navClass.isActive ? "nav-link active__menu" : "nav-link"
              }
            >
              Feedback
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav mr-auto profile_item">
          <li className="nav-item cart_icon">
            <a className="nav-link" href="#">
              <NavLink
                to="/cart"
                className={(navClass) =>
                  navClass.isActive ? " nav-link " : " nav-link"
                }
              >
                <div className="cart-icon">
                  <ShoppingCartOutlinedIcon style={{ position: "relative" }} />
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning "
                    style={{
                      color: "white",
                      borderRadius: "50%",
                      position: "absolute",
                      top: 8,
                      left: 35,
                    }}
                  >
                    {cartSize}
                  </span>
                </div>
              </NavLink>
            </a>
          </li>
          <li className="nav-item profile_icon">
            <a
              className="nav-link "
              onClick={() => {
                handleShowProfile();
              }}
            >
              <PermIdentityOutlinedIcon
                style={{ fontSize: "28px", cursor: "pointer" }}
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
