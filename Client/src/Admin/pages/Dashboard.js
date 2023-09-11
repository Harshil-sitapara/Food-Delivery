import React, { useEffect, useState } from "react";
import AdminNav from "../nav/AdminNav";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const data = [
  { name: "Mon", sales: 900 },
  { name: "Tue", sales: 200 },
  { name: "Wed", sales: 150 },
  { name: "Thu", sales: 900 },
  { name: "Fri", sales: 350 },
  { name: "Sat", sales: 220 },
  { name: "Sun", sales: 900 },
];

export default function Dashboard() {
  const [dailySalesData, setDailySalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalShippedOrders, setTotalShippedOrders] = useState(0);
  const [totalTotalReview, setTotalTotalReview] = useState(0);
  useEffect(() => {
    fetch("/api/getDailySalesData")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data); // Check the data received from the server
        setDailySalesData(data);
      })
      .catch((error) => {
        console.error("Error fetching daily sales data:", error);
      });
  }, []);

  useEffect(() => {
    countTotalUser();
    countTotalRevenue();
    countTotalOrderShipped();
    handleTotalReview();
  }, []);
  //total users
  const countTotalUser = async () => {
    const res = await fetch("http://localhost:8080/allusers", {
      method: "GET",
    });
    const data = await res.json();
    setTotalUsers(data.length);
  };
  //total revenue
  const countTotalRevenue = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/orders", {
        method: "GET",
      });
      const data = await res.json();

      // Calculate the total revenue
      const totalRevenueSum = data.reduce(
        (sum, order) => sum + order.orderAmount,
        0
      );
      setTotalRevenue(totalRevenueSum);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };
  //total order shipped
  const countTotalOrderShipped = async () => {
    const result = await fetch(
      "http://localhost:8080/api/getTotalShippedOrders",
      {
        method: "GET",
      }
    );
    const data = await result.json();
    setTotalShippedOrders(data.count);
  };
  //count total reviews
  const handleTotalReview = async () => {
    const result = await fetch("http://localhost:8080/feedback", {
      method: "GET",
    });
    const data = await result.json();
    setTotalTotalReview(data.length);
    console.log("DATA", data);
  };
  return (
    <>
      <AdminNav />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2 className="mb-4 adminHeadingText">Admin Insights</h2>
          {/* <div className="chart-container">
            <ResponsiveContainer width="100%" height={300} className={"dashboardChart"}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div> */}
        </div>
        <div className="cart-content">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Card className="cancleCard">
                <CardContent>
                  <Typography variant="h6 dashCardText">Total reviews</Typography>
                  <Typography variant="h4">{totalTotalReview}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* pending payment */}
            <Grid item xs={12} sm={6} md={6}>
              <Card className="penddingPayment">
                <CardContent>
                  <Typography variant="h6 dashCardText">Total orders shipped</Typography>
                  <Typography variant="h4">{totalShippedOrders}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* complete payment */}
            <Grid item xs={12} sm={6} md={6}>
              <Card className="completePayment">
                <CardContent>
                  <Typography variant="h6 dashCardText">Total revenue</Typography>
                  <Typography variant="h4">{totalRevenue}/-</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* users */}
            <Grid item xs={12} sm={6} md={6}>
              <Card className="users">
                <CardContent>
                  <Typography variant="h6 dashCardText">Total Users</Typography>
                  <Typography variant="h4">{totalUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
