import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Review.css';
const ReviewPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/thankyou');
  };

  return (
    <div className="review-page vh-100">
      <h1>Camera Service Center Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Stars<span className="star-symbol" />
        </label>
        <select>
            <option value={0}>Select</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        <br />
        <label>
          Comment:
        </label>
        <textarea placeholder="Please share your experience..." />
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewPage;






