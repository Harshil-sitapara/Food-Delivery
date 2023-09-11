import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert library
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersResponse = await fetch("http://localhost:8080/orders", {
        method: "GET",
        credentials: "include", // added this part
      });
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);
    } catch (error) {
      console.log("Error while fetching orders!", error);
    }
  };

  const handleCancelOrder = (orderId) => {
    // Use SweetAlert to confirm cancellation
    Swal.fire({
      title: "Cancel Order",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a request to cancel the order here
          const response = await fetch(
            `http://localhost:8080/orders/${orderId}`,
            {
              method: "DELETE",
            }
          );

          if (response.status === 200) {
            Swal.fire(
              "Cancelled!",
              "Your order has been cancelled.",
              "success"
            );
            // Refresh the list of orders
            fetchOrders();
          } else {
            Swal.fire(
              "Error",
              "An error occurred while cancelling the order.",
              "error"
            );
          }
        } catch (error) {
          console.log("Error while cancelling the order", error);
          Swal.fire(
            "Error",
            "An error occurred while cancelling the order.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="orderPageContainer">
        <div className="orderContent">
          <h2 className="orderTitle">Order History</h2>
          <hr />
          {orders.map((order) => (
            <div className="orderItem" key={order._id}>
              <div className="orderDetails">
                <div className="orderDate">
                  Order Date: {new Date(order.orderTime).toLocaleDateString()}
                </div>
                <div className="orderAmount">
                  Total Amount: ${order.orderAmount.toFixed(2)}
                </div>
                <div className="orderId">Order ID: {order.orderId}</div>
                <div
                  className="orderItem"
                  key={order._id}
                  style={{
                    borderLeftWidth:10,
                    paddingLeft:10,
                    borderLeftColor:
                      order.orderStatus === "Delivered"
                        ? "green"
                        : order.orderStatus === "Placed"
                        ? "blue"
                        : order.orderStatus === "Confirmed"
                        ? "purple" 
                        : order.orderStatus === "Preparing"
                        ? "orange"
                        : order.orderStatus === "Out of Del."
                        ? "red"
                        : "black",
                  }}
                >
                  Order Status: <b>{order.orderStatus}</b>
                </div>
                <div className="cancelOrderButtonWrapper">
                  <Button
                    variant="outlined"
                    color="error"
                    className="cancelOrderButton"
                    onClick={() => handleCancelOrder(order.orderId)}
                    disabled={
                      order.orderStatus == "Out of Delivery" ||
                      order.orderStatus == "Delivered"
                        ? true
                        : false
                    }
                  >
                    Cancel Order
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-center noOrderText">No orders found.</p>
          )}
          <p className="backToHome">
            <Link to="/home">Back to Home</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
