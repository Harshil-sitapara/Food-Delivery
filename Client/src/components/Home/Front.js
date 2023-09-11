import React, { useEffect } from "react";
import backGif from "../../assets/images/TakeBike1.svg";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { useNavigate } from "react-router-dom";

export default function Front() {
  const navigate = useNavigate();
  return (
    <div className="mainContainer">
      <div data-aos="zoom-in" className="leftContainer">
        <div className="frontText">
          <h4 className="firstLine">Easy way to make an order</h4>
          <h1 className="secondLine">
            <span style={{ color: "orange", fontWeight: "bold" }}>HUNGRY?</span>{" "}
            Just wait
          </h1>
          <h1 className="thirdLine">
            food at
            <span
              style={{
                color: "orange",
                fontWeight: "bold",
                paddingLeft: "10px",
              }}
            >
              your door
            </span>
          </h1>
          <p className="para">
          Delightful Culinary Delights, Delivered Fresh. 
            <br />
            Welcome to FoodEase!
          </p>
          <div className="frontBtns">
            <Button
              variant="contained"
              style={{ marginRight: "2rem", backgroundColor: "#f3bb55",border:"none" }}
              onClick={()=>{navigate("/foods")}}
            >
              Order Now
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outlined"
              className="allFoodsBtn"
              style={{ borderColor: "#f3bb55", color: "#f3bb55" }}
              onClick={()=>{navigate("/foods")}}
            >
              SEE ALL FOODS
            </Button>
          </div>
          <div className="guaranty">
            <div className="leftGuaranty">
              <DirectionsCarOutlinedIcon
                style={{
                  backgroundColor: "#ffdd9f",
                  marginTop: "2px",
                  padding: "4px",
                  border: "2px solid #f3bb55",
                  fontSize: "30px",
                  borderRadius: "50%",
                }}
              />
              <p>No shipping charge</p>
            </div>
            <div className="rightGuaranty">
              <GppGoodOutlinedIcon
                style={{
                  backgroundColor: "#ffdd9f",
                  border: "2px solid #f3bb55",
                  borderRadius: "50%",
                  marginTop: "2px",
                  fontSize: "30px",
                  padding: "2px",
                }}
              />
              <p>100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <div data-aos="fade-right" className="imageContainer mt-4">
          <img src={backGif} alt="Backgif" className="backGif mt-4 ml-3" />
        </div>
      </div>
    </div>
  );
}
