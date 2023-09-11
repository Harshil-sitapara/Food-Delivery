import React, { useEffect, useState } from "react";
import AdminNav from "../nav/AdminNav";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChange = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (response.ok) {
        // Update the orderList locally to reflect the change
        const updatedOrderList = orderList.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatus: newStatus }
            : order
        );
        setOrderList(updatedOrderList);
      } else {
        console.log("Error updating order status");
      }
    } catch (error) {
      console.log("Error while updating order status", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const ordersResponse = await fetch("http://localhost:8080/admin/orders", {
        method: "GET",
      });
      const ordersData = await ordersResponse.json();
      setOrderList(ordersData);
      console.log("ORDER DATA", ordersData);
    } catch (error) {
      console.log("Error while fetching orders!", error);
    }finally{
      setTimeout(() => {
          setLoading(false)
      }, 500);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="tblMainDiv">
        <div className="titles">
          <h4 className="mb-4 feedHadingText">Order Management Dashboard</h4>
          <div
            className="refreshBtn"
            onClick={() => {
              fetchAllOrders();
            }}
          >
            <RefreshIcon className="" />
          </div>
        </div>
        {loading?<div className="loader">
       <div class="spinner"></div>
       </div>: <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Order id</th>
              <th scope="col">Order Amount</th>
              <th scope="col">Order Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.orderId}>
                <td>{order.userName}</td>
                <td>{order.orderId}</td>
                <td>{order.orderAmount}/-</td>
                <td>{new Date(order.orderTime).toLocaleString()}</td>
                <td>
                  <FormControl style={{ minWidth: "135px" }}>
                    <Select
                      value={order.orderStatus ? order.orderStatus : "Placed"}
                      onChange={(event) => handleChange(event, order.orderId)}
                    >
                      <MenuItem value={"Placed"}>Placed</MenuItem>
                      <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                      <MenuItem value={"Preparing"}>Preparing</MenuItem>
                      <MenuItem value={"Out of Delivery"}>Out of Del.</MenuItem>
                      <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
        
       
      </div>
    </>
  );
}
