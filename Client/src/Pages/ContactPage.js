import React, { useEffect, useState } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import {
  TextField,
  TextareaAutosize,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Swal from "sweetalert2";

export default function Contact() {
  useEffect(() => {
    document.title = "FoodEase - feedback";
  }, []);

  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [rating, setRating] = useState(0); // State for the rating
  const [deliverySpeed, setDeliverySpeed] = useState(""); // State for the delivery speed
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleDeliverySpeedChange = (event) => {
    setDeliverySpeed(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate a network request or data submission
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    handleStoreData();
    Swal.fire("Feedback sent!", `Thanks ${name} for feedback!`, "success");
  };

  const handleStoreData = async () => {
    try {
      const response = await fetch("http://localhost:8080/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          orderId,
          rating,
          deliverySpeed,
          message,
        }),
      });

      if (response.ok) {
        console.log("Feedback submitted successfully!");
        setIsLoading(false);
        setRating(0);
        setDeliverySpeed("");
        setMessage("");
        setName("");
        setOrderId("");
      } else {
        console.log("Error submitting feedback.");
      }
    } catch (error) {
      console.log("Error while fetch data", error);
    }
  };
  return (
    <>
      <Navbar />
      <section>
        <div className="mainFeedbackDiv">
          <h5 className="feedbackLine">
            Your Feedback Drives Us to Deliver Excellence
          </h5>
          <hr />
          <form className="feedForm" onSubmit={handleSubmit}>
            <div class="form-group">
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                InputLabelProps={{
                  required: false,
                }}
                required
              />
            </div>
            <div class="form-group">
              <TextField
                id="standard-basic"
                label="Order Number"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setOrderId(e.target.value);
                }}
                value={orderId}
                InputLabelProps={{
                  required: false,
                }}
                required
              />
            </div>
            <div class="form-group">
              <label>Rating</label>
              <br />
              <Rating
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                InputLabelProps={{
                  required: false,
                }}
                required
              />
            </div>
            <div class="form-group">
              <Select
                label="Delivery Speed"
                variant="standard"
                fullWidth
                value={deliverySpeed}
                onChange={handleDeliverySpeedChange}
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  Select delivery speed
                </MenuItem>
                <MenuItem value={"Fast"}>Fast</MenuItem>
                <MenuItem value={"Average"}>Average</MenuItem>
                <MenuItem value={"Slow"}>Slow</MenuItem>
              </Select>
            </div>
            <div class="form-group">
              <TextareaAutosize
                color="primary"
                minRows={2}
                placeholder="Give your message"
                value={message}
                onChange={handleMessageChange}
                style={{ width: "100%", padding: 10 }}
                InputLabelProps={{
                  required: false,
                }}
                required
              />
            </div>

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={25} /> : "Submit"}
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
