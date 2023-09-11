import React, { useState } from "react";
import TransparentImage from "../components/Food/TransparentImage";
import Navbar from "../components/Home/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "../components/Home/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const total_amount = searchParams.get("total");
  const after_shipping = Number(total_amount) + 30;

  const generateOrderId = Math.random()
    .toString(36)
    .toUpperCase()
    .substring(2, 17);

  const sendDatToServer = async () => {
    const data = {
        orderAmount:after_shipping,
        orderId:generateOrderId,
        userName:formData.fname
    }
    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200) {
        showSwalAlert();
      } else if (response.status === 401) {
        Swal.fire({
          icon: "info",
          title: "Login Required",
          text: "Please log in to place an order.",
          showCancelButton: true,
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: "An error occurred while placing the order.",
        });
      }
    } catch (error) {
      console.log("Error while placing order", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    sendDatToServer()
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showSwalAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Thank you",
      text: "Your order is confirmed",
      html: `<p>Your order has been successfully placed.</p><br/><p>Order ID: ${generateOrderId}</p><p>Order Amount: ${after_shipping}/-</p>`,
    }).then((result)=>{
          if(result.isConfirmed){
            navigate('/home')
          }
    })
  };
  return (
    <>
      <Navbar />
      <TransparentImage name="Checkout" />
      <div className="main-checkout">
        <div className="checkout-form-container">
          <form
            className="checkout-form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h6>Shipping Address</h6>
            <input
              type="text"
              className="txtName"
              name="fname"
              onChange={handleOnChange}
              placeholder="Enter your name"
              required
            />
            <input
              type="email"
              className="txtEmail"
              name="email"
              onChange={handleOnChange}
              placeholder="Enter your email"
              required
            />
            <input
              type="phone"
              className="txtPhone"
              name="phone"
              onChange={handleOnChange}
              placeholder="Phone number"
              required
            />
            <input
              type="text"
              className="txtCountry"
              name="country"
              placeholder="Country"
              required
            />
            <input
              type="text"
              className="txtCity"
              name="city"
              placeholder="City"
              required
            />
            <input
              type="text"
              className="txtPostal"
              name="postal"
              placeholder="Postal code"
              required
            />
            <button type="submit" className="paymentBtn">
              Place Order
            </button>
          </form>
        </div>
        <div className="total-ckeckout">
          <h6>
            Subtotal:<span>{total_amount}/-</span>
          </h6>
          <br />
          <h6>
            Shipping:<span>30/-</span>
          </h6>
          <hr />
          <h6 style={{ fontSize: "25px" }}>
            Total:<span>{after_shipping}/-</span>
          </h6>
        </div>
      </div>
      <Footer />
    </>
  );
}
