import React, { useEffect, useState } from "react";
import axios from 'axios';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import './EditBooking.css'
import { useNavigate } from 'react-router-dom';
=======
import { useParams,Link, Outlet,useNavigate } from 'react-router-dom';
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
import { useParams,Link, Outlet,useNavigate } from 'react-router-dom';
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
import { useParams,Link, Outlet,useNavigate } from 'react-router-dom';
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
import { useParams,Link, Outlet,useNavigate } from 'react-router-dom';
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63


function EditBooking() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState('');

  const [values, setValues] = useState({
    productName: '',
    productModelNo: '',
    dateOfPurchase: '',
    contactNumber: '',
    problemDescription: '',
    selectedSlot: '',
  });

  const { id } = useParams();
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const navigate = useNavigate();

  useEffect(() => {
    generateSlots();
  }, [bookedSlots]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    axios
      .get(`https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/api/Appointment/getdetails/${id}`)
      .then((res1) => {
        // Set the booked slots
       // console.log(res1);
        const { selectedSlot, availableSlots } = res1.data.result;
        setSelectedSlot(selectedSlot);
        setBookedSlots(availableSlots);

        const {
          productName,
          productModelNo,
          dateOfPurchase,
          contactNumber,
          problemDescription,
        } = res1.data.result;

        setValues({
          ...values,
          productName: productName,
          productModelNo: productModelNo,
          dateOfPurchase: dateOfPurchase,
          contactNumber: contactNumber,
          problemDescription: problemDescription,
          selectedSlot,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const generateSlots = () => {
    const today = new Date();
    const generatedSlots = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      for (let j = 9; j <= 17; j++) {
        const slot = formatDate(date) + ' ' + formatTime(j);
        if (!bookedSlots.includes(slot)) {
          generatedSlots.push(slot);
        }
      }
    }

    setSlots(generatedSlots);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  };

  const formatTime = (hours) => {
    const minutes = '00';
    return ('0' + hours).slice(-2) + ':' + minutes;
  };

  const handleSlotChange = (event) => {
    const selectedSlot = event.target.value;
    setSelectedSlot(selectedSlot);
    setValues((prev) => ({ ...prev, selectedSlot }));
    setError('');
  
    if (bookedSlots.includes(selectedSlot)) {
      setError('Slot is already booked');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = { ...values, selectedSlot };

    // Check if the selected slot is already booked
    if (selectedSlot) {
      axios
        .get(`https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/api/Appointment/checkSlotAvailability/${selectedSlot}/${id}`)
        .then((res) => {
          if (res.data.status === 'Error') {
            setError('Slot is already booked. Please select another slot.');
          } else {
            // Slot is available or unchanged, proceed with the update
            updateBooking(payload);
          }
        })
        .catch((err) => console.log(err));
    } else {
      // Slot is not selected, proceed with the update
      updateBooking(payload);
    }
  };

  const updateBooking = (payload) => {
    axios
      .put(`https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/api/Appointment/updateBooking/${id}`, payload)
      .then((res) => {
        if (res.data.message === 'Booking updated successfully') {
          navigate('/mybooking');
        }
      })
      .catch((err) => console.log(err));
  };
  
  function HandleLogout() {
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
  }
  
  return (
    <div className="body vh-100">
      <br />
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container-fluid">
          <a className="navbar-brand">Kraft Cam</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/homepage" className="nav-link " id="homeButton" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link" id="dashBoardButton">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mybooking" className="nav-link active" id="myBookingButton">
                  My Booking
                </Link>
              </li>
            </ul>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            <a className="logout" id="logout" onClick={HandleLogout}></a>
=======
            <a className="logout" id="logout" onClick={HandleLogout}>Logout</a>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
            <a className="logout" id="logout" onClick={HandleLogout}>Logout</a>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
            <a className="logout" id="logout" onClick={HandleLogout}>Logout</a>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
            <a className="logout" id="logout" onClick={HandleLogout}>Logout</a>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
          </div>
        </div>
        <Outlet />
      </nav>
      <div className="right-column col-9 updatebookingform">
        <form className="dashBoardBody" onSubmit={handleSubmit}>
          <h2>Enter the Product Details</h2>
          <div className="mb-3">
            <input
              type="text"
              id="productName"
              placeholder="Enter the name of the product"
              name="productName"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.productName}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="productModelNo"
              placeholder="Enter the model no of the product"
              name="productModelNo"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.productModelNo}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              id="dateOfPurchase"
              placeholder="Enter the date of purchase"
              name="dateOfPurchase"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.dateOfPurchase}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="contactNumber"
              placeholder="Enter thecontact number"
              name="contactNumber"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.contactNumber}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="problemDescription"
              placeholder="Enter the Problem of the product"
              name="problemDescription"
              className="form-control rounded-2"
              autoComplete="off"
              value={values.problemDescription}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectedSlot">Select a slot:</label>
            <select
              id="selectedSlot"
              name="selectedSlot"
              className="form-control rounded-2"
              value={selectedSlot}
              onChange={handleSlotChange}
            >
              <option value="" disabled>
                Select a slot
              </option>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
=======
              {slots.map((slot) => (
                <option key={slot} value={slot}>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
              {slots.map((slot) => (
                <option key={slot} value={slot}>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
              {slots.map((slot) => (
                <option key={slot} value={slot}>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
              {slots.map((slot) => (
                <option key={slot} value={slot}>
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
                  {slot}
                </option>
              ))}
            </select>
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" className="btn btn-primary" id="updateBooking">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBooking;