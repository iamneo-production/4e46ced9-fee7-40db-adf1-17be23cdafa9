import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaFileInvoice } from 'react-icons/fa';

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchBookings();
  }, []);

const fetchBookings = async () => {
    try {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      const response = await axios.get(`https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/api/Appointment/getdetails?userId=${loggedInUserId}`);
      const { data } = response;
      setBookings(data.result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }
  function formatHour(hour) {
    if (hour === 0) {
      return 12;
    } else if (hour > 12) {
      return hour - 12;
    } else {
      return hour;
    }
  }
  
  function formatTime(time) {
    if (!time) return '';
    const date = new Date(time);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = formatHour(hour);
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHour}:${formattedMinutes} ${period}`;
  }

  const NoBookingsMessage = () => {
    return <div>No bookings available</div>;
  };

  const deleteBooking = (bookingID) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      axios
        .delete(`https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/api/Appointment/delete/${bookingID}`)
        .then(() => {
          fetchBookings();
        })
        .catch((error) => {
          console.error('Error deleting booking:', error);
          setError('Failed to delete booking');
        });
    }
  };

  function HandleLogout() {
    navigate('/login');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('authenticatedAdmin');
    localStorage.removeItem('loggedInUserId');
  }

  return (
    <div className="body vh-100">
      <br />
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <div className="container-fluid">
          <a href=" " className="navbar-brand">
            Kraft Cam
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/homepage" className="nav-link active" id="homeButton" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link" id="dashBoardButton">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mybooking" className="nav-link" id="myBookingButton">
                  My Booking
                </Link>
              </li>
            </ul>
            <Link to="/login" className="logout" id="logout" onClick={HandleLogout}>
              Logout
            </Link>
          </div>
        </div>
        <Outlet />
      </nav>
      <div className="my-booking-container">
        {error && <div>Error: {error}</div>}
        {bookings.length === 0 ? (
          NoBookingsMessage()
        ) : (
          <>
            <div className="action-buttons">
            </div>
            <table className="table" id="myBookingBody">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Timing</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Bill</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.ID}>
                    <td>{booking.serviceCenterName}</td>
                    <td>{formatDate(booking.availableSlots)}</td>
                    <td>{formatTime(booking.availableSlots)}</td>
                    <td>
                      <Link to={`/editbooking/${booking.id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td>
                      <FaTrash onClick={() => deleteBooking(booking.id)} />
                    </td>
                    <td>
                      <Link to={`/billgeneration/${booking.id}`}>
                        <FaFileInvoice />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default MyBooking;