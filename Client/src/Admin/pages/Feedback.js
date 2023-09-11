import React, { useEffect, useState } from "react";
import AdminNav from "../nav/AdminNav";
import Rating from "@mui/material/Rating";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Feeback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllFeedback = async () => {
    try {
      const res = await fetch("http://localhost:8080/feedback", {
        method: "GET",
      });
      const data = await res.json();
      setFeedbackData(data);
      console.log("feedback", feedbackData);
    } catch (error) {
      console.log("Error while fetching feedback:", error);
    }finally{
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }
  };
  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredFeedbacks = feedbackData.filter((feedback) =>
    feedback.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteFeedback=async(id)=>{
      const res = await fetch(`http://localhost:8080/feedback/${id}`,{
        method:"DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res.ok) {
        await res.json();
        fetchAllFeedback(); 
      } else {
        console.log("Error deleting feedback");
      }
  }
  return (
    <>
      <AdminNav />
      <div className="titles">
        <h4 className="mt-3 mb-4 feedHadingText">Feedback Management Dashboard</h4>
        <div className="headingAction">
          <div className="searchRefreshContainer">
            <TextField
              id="standard-basic"
              label="Search by name..."
              variant="standard"
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </div>
        </div>
      </div>
      {loading?<div className="loader">
       <div class="spinner"></div>
       </div>:<table class="table">
        <thead>
          <tr>
            <th scope="col">User name</th>
            <th scope="col">Order id</th>
            <th scope="col">Rating</th>
            <th scope="col">Accuracy</th>
            <th scope="col">Message</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feeds) => (
              <tr>
                <th scope="row">{feeds.name}</th>
                <td>{feeds.orderId}</td>
                <td>
                  <Rating name="disabled" value={feeds.rating} disabled />
                </td>
                <td>{feeds.delSpeed}</td>
                <td>{feeds.msg}</td>
                <td>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    style={{ color: "red", borderColor: "red",outline:"none" }}
                    onClick={()=>{handleDeleteFeedback(feeds._id)}}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center pt-5">
                No results found for "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>}
      
    </>
  );
}

export default Feeback;
