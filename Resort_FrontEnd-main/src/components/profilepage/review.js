import React, { useState } from "react";
import "./profile.css";
import star from "./assets/star.png";
import { FaStar } from "react-icons/fa";
import { Modal, Input } from "antd";
import Axios from "axios";

function Review(props) {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState(null);
  const [hover, setHover] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal

  const handleInputChange = (event) => {
    const { value } = event.target;
    setReview(value);
    console.log(value); // Log the current value of the textarea
  };

  const handleReviewSubmit = () => {
    console.log(review); // here its empty
    Axios.post("http://localhost:5000/addreview", {
      review: review,
      rating: rating,
      guest_id: props.guest,
    })
      .then(() => {
        setReview("");
        setModalVisible(true); // Show the modal on success
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  if (props.guest === undefined || props.guest === 0) {
    return null; // Don't render anything if guest ID is 0 or undefined
  }

  return (
    <>
      <div className="profile_stars">
        <h2 className="profile_name">Leave A Review</h2>
      </div>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <textarea
          style={{ flex: "1", resize: "none" }}
          rows={10}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="profile_stars">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <FaStar
                className="star"
                size={50}
                color={
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <button onClick={handleReviewSubmit}>Submit Review</button>
      <Modal
        title="Review Submitted"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <p>Your review has been submitted successfully!</p>
      </Modal>
    </>
  );
}

export default Review;
