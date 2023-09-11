import React, { useContext, useEffect, useState } from "react";
//card images
import { foodpopular } from "../APIs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CartContext } from "../../App";

export default function PopularFood() {
  const [foodData, setFoodData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const {cartSize,setCartSize} = useContext(CartContext);

  useEffect(() => {
    const sendDataToServer = async () => {
      try {
        //send data to server
        const response = await fetch("http://localhost:8080/cart", {
          method: "POST",
          body: JSON.stringify(foodData), 
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.text();
        console.log(data);
      } catch (err) {
        console.log("Error while send data", err);
      }
    };
    if (Object.keys(foodData).length > 0) {
      sendDataToServer().catch((err) => {
        console.log(err);
      });
    }
  }, [foodData]);

  const handleAddCart = async (image, name, price, id) => {
    console.log("Image path:", image);
    setFoodData({
      image: image,
      name: name,
      price: price,
      id: id,
    });
    setShowAlert(true)
    setCartSize(Number(cartSize)+1)
  };

  
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <section>
      <div className="popularFoodMain pt-5">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center py-4">Popular foods</h1>
          </div>
          <div className="col-lg-12">
            <div className="d-flex row card-container mt-5">
              {foodpopular.map((cval) => (
                <div
                  data-aos="zoom-in"
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
                          handleAddCart(
                            cval.image,
                            cval.name,
                            cval.price,
                            cval.id
                          );
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Snackbar
        open={showAlert}
        autoHideDuration={3000} // Adjust the duration you want the alert to be shown
        onClose={handleCloseAlert} // Close the alert when it's closed
      >
        <MuiAlert onClose={handleCloseAlert} severity="success">
          Product added to cart!
        </MuiAlert>
      </Snackbar>
      </div>
    </section>
  );
}
