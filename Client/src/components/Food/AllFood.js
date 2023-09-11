import React, { useContext, useEffect, useState } from "react";
import { foods } from "../APIs";
import { useNavigate } from "react-router-dom";
//
import SearchIcon from "@mui/icons-material/Search";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CartContext } from "../../App";
export default function AllFood() {
  const [fooddata, setFoodData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const { cartSize, setCartSize, userData } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterdFood, setFilterdFood] = useState([]);
  const [Authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const sendDataToServer = async () => {
      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        body: JSON.stringify(fooddata),
        headers: {
          "Content-type": "application/json",
        },
      });
    };
    if (Object.keys(fooddata).length > 0) {
      sendDataToServer().catch((err) => {
        console.log("Error:", err);
      });
    }
  }, [fooddata]);

  useEffect(() => {
    const filterd = foods.filter((foods) =>
      foods.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterdFood(filterd);
  }, [foods, searchQuery]);

  const handleAddToCart = (id, image, name, price) => {
    
    if (userData) { // Check if the user is logged in
      setFoodData({
        id: id,
        image: image,
        name: name,
        price: price,
      });
      setShowAlert(true);
      setCartSize(cartSize + 1);
    } else {
      navigate("/home")
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <section className="allfood-container mt-5">
        <div className="inner-allfood pt-3">
          <div className="input-con">
            <input
              type="text"
              className="search-con"
              placeholder="I'm looking for..."
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <SearchIcon
              style={{
                cursor: "pointer",
                position: "relative",
                top: 6,
                left: "47%",
              }}
            />
          </div>
          <div className="cards-container row mt-5">
            {filterdFood == "" ? (
              <p className="not-found-txt">
                Item not found for{" "}
                <span style={{ fontWeight: "bold" }}>"{searchQuery}"</span>
              </p>
            ) : (
              filterdFood.map((cval) => (
                <div
                  key={cval.id}
                  className="mb-4 col-6 col-sm-6 col-md-4 col-lg-3 mx-3 card"
                >
                  <div className="card-image">
                    <img src={cval.image} alt="burger" />
                  </div>
                  <div className="card-contant">
                    <h3>{cval.name}</h3>
                    <div className="bottom-card-contant ">
                      <h4>{cval.price}/-</h4>
                      <button
                        className="addToCartBtn"
                        onClick={() => {
                          handleAddToCart(
                            cval.id,
                            cval.image,
                            cval.name,
                            cval.price
                          );
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Snackbar
            open={showAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <MuiAlert onClose={handleCloseAlert} severity="success">
              Product added to cart!
            </MuiAlert>
          </Snackbar>
        </div>
      </section>
    </>
  );
}
