import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaFileInvoice } from 'react-icons/fa';

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
<<<<<<< HEAD
  const [selectedBookings, setSelectedBookings] = useState([]);
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
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
<<<<<<< HEAD
<<<<<<< HEAD

  function formatTime(time) {
    if (!time) return '';

=======
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
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
<<<<<<< HEAD
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
    const date = new Date(time);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';
<<<<<<< HEAD
<<<<<<< HEAD
    const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const formattedMinutes = String(minutes).padStart(2, '0');

=======
    const formattedHour = formatHour(hour);
    const formattedMinutes = String(minutes).padStart(2, '0');
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
    const formattedHour = formatHour(hour);
    const formattedMinutes = String(minutes).padStart(2, '0');
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
    return `${formattedHour}:${formattedMinutes} ${period}`;
  }

  const NoBookingsMessage = () => {
    return <div>No bookings available</div>;
  };

<<<<<<< HEAD
<<<<<<< HEAD
  const handleBookingSelection = (bookingID) => {
    if (selectedBookings.includes(bookingID)) {
      setSelectedBookings((prevSelected) => prevSelected.filter((id) => id !== bookingID));
    } else {
      setSelectedBookings((prevSelected) => [...prevSelected, bookingID]);
    }
  };

=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
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

<<<<<<< HEAD
<<<<<<< HEAD
  const deleteSelectedBookings = async () => {
    if (selectedBookings.length > 0) {
      if (window.confirm('Are you sure you want to delete the selected bookings?')) {
        try {
          const requestData = {
            bookingIDs: selectedBookings.map(Number),
          };

          await axios.delete('https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/api/Appointment/deleteMultiple', {
            data: JSON.stringify(requestData),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          fetchBookings();
          setSelectedBookings([]);
        } catch (error) {
          console.error('Error deleting bookings:', error);
          setError('Failed to delete bookings');
        }
      }
    }
  };

=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
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
<<<<<<< HEAD
<<<<<<< HEAD
          <NoBookingsMessage />
        ) : (
          <>
            <div className="action-buttons">
              <button onClick={deleteSelectedBookings} disabled={selectedBookings.length === 0}>
                Delete Selected
              </button>
=======
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
          NoBookingsMessage()
        ) : (
          <>
            <div className="action-buttons">
<<<<<<< HEAD
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
            </div>
            <table className="table" id="myBookingBody">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Timing</th>
<<<<<<< HEAD
<<<<<<< HEAD
                  <th>Select</th>
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
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
<<<<<<< HEAD
<<<<<<< HEAD
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(booking.id)}
                        onChange={() => handleBookingSelection(booking.id)}
                      />
                    </td>
                    <td>
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
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