import React, { useEffect } from "react";
//icon
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  const goToSocial = (which) => {
    let url ="";
    switch (which) {
      case "facebook":
        url = "https://www.facebook.com";
        break;
      case "instagram":
        url = "https://www.instagram.com";
        break;
      case "github":
        url = "https://github.com/Harshil-sitapara/FoodEase";
        break;
      case "twitter":
        url = "https://twitter.com";
        break;
      default:
        break;
    }
    window.open(url, "_blank");
  };
  return (
    <div className="fooetrMainContainer row mt-5">
      <div className="footerContainer ">
        <div className="firstFooterSection col-sm-6 col-md-4 col-lg-3">
          <h1 className="footerLogo">FoodEase</h1>
          <p>
          FoodEase - Elevating Culinary Experiences. Taste the Difference with Our Exquisite Dishes, Quality Service, and Unforgettable Moments.
          </p>
        </div>
        <div className="secondFooterSection section  col-sm-6 col-md-4 col-lg-3">
          <h5>Delivery Time</h5>
          <p>
            <span>
              Sunday - Thursday
              <br />
            </span>
            10:00am - 11:00pm
          </p>
          <p>
            <span>
              Friday - Saturday
              <br />
            </span>
            Off day
          </p>
        </div>
        <div className="thirdFooterSection section  col-sm-6 col-md-4 col-lg-3">
          <h4>Contact</h4>
          <p>
            Location: ZindaBazar, Sylhet-3100, <br />
            Bangladesh
          </p>
          <p className="credencial">Phone: 01712345678</p>
          <p className="credencial">Email: example@gmail.com</p>
        </div>
        <div className="fourthFooterSection section col-sm-6 col-md-4 col-lg-3">
          <div className="email">
            <h3>Newsletter</h3>
            <p>Subscribe our newsletter</p>
            <div className="emailContainer">
              <input
                type="text"
                className="form-control w-82 email-input "
                placeholder="Enter E-mail..."
              />
              <SendIcon
                style={{
                  position: "relative",
                  right: 40,
                  top: 8,
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="social">
              <ul className="d-flex">
                <li
                  onClick={() => {
                    goToSocial("facebook");
                  }}
                >
                  <FacebookIcon />
                </li>
                <li
                  onClick={() => {
                    goToSocial("github");
                  }}
                >
                  <GitHubIcon />
                </li>
                <li
                  onClick={() => {
                    goToSocial("instagram");
                  }}
                >
                  <InstagramIcon />
                </li>
                <li
                  onClick={() => {
                    goToSocial("twitter");
                  }}
                >
                  <TwitterIcon />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
