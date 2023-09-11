import React, { useContext, useEffect, useState } from "react";
import { HotPizzaItems } from "../APIs";
import { CartContext } from "../../App";

export default function HotPizza() {
  const [pizzas, setPizzas] = useState({});
  const {cartSize,setCartSize} = useContext(CartContext);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const sendDataToServer = async () => {
      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        body: JSON.stringify(pizzas),
        headers: {
          "Content-type": "application/json",
        },
      });
    };
    if (Object.keys(pizzas).length > 0) {
      sendDataToServer().catch((err) => {
        console.log("Error:", err);
      });
    }
  }, [pizzas]);



  const handleAddCart = (id,image,name,price) => {
    setPizzas({
        id:id,
        image:image,
        name:name,
        price:price
    })
    setCartSize(cartSize+1)
  };
  return (
    <div data-aos="zoom-in" className="hotPizzaContainer mb-4">
      <h2>Hot Pizza</h2>
      <div className="d-flex row card-container container">
        {HotPizzaItems.map((cval, ind) => (
          <div key={cval.id} className="col card mx-4">
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
                    handleAddCart(cval.id, cval.image, cval.name, cval.price);
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
  );
}
