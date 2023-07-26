import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import LoginAuth from '../Auth/LoginAuth';
import axios from 'axios';
import './Login.css';

function Login() {
  const [values, setValues] = useState({
    Email: '',
    Password: '',
  });
  const navigate = useNavigate();

  const [errors, setError] = useState('');

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLoginSuccess = (status, userId) => {
    if (values.Email === 'admin' && values.Password === 'admin') {
      localStorage.setItem('authenticatedUser', false);
      localStorage.setItem('authenticatedAdmin', true);
    } else {
      localStorage.setItem('authenticatedUser', true);
      localStorage.setItem('authenticatedAdmin', false);
      localStorage.setItem('loggedInUserId', userId);
    }
    if (values.Email === 'admin' && values.Password === 'admin') {
      navigate('/admin');
    } else {
      navigate('/homepage');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = LoginAuth(values);
    setError(validationErrors);

    if (validationErrors.Email === '' && validationErrors.Password === '') {
      try {
        const res = await axios.post('https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/login', values);
        const responseData = res.data;
        const status = responseData.status;
        const userId = responseData.userId;
        if (status === 'Success') {
<<<<<<< HEAD
          if (values.Email === 'admin' && values.Password === 'admin') {
            localStorage.setItem('authenticatedUser', false);
            localStorage.setItem('authenticatedAdmin', true);
          } else {
            localStorage.setItem('authenticatedUser', true);
            localStorage.setItem('authenticatedAdmin', false);
            localStorage.setItem('loggedInUserId', userId);
          }
          if (values.Email === 'admin' && values.Password === 'admin') {
            navigate('/admin');
          } else {
            navigate('/homepage');
          }
=======
          handleLoginSuccess(status, userId);
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
        }
      } catch (err) {
        console.log(err);
        alert("Wrong Credentials");
        navigate('/signup');
      }
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 loginHead'>
        <strong>Login</strong>
      </div>
      <br />
      <div className='d-flex justify-content-center align-items-center loginPage'>
        <form onSubmit={handleSubmit} className='loginForm'>
          <div className='mb-3'>
            <input
              type="text"
              id="email"
              placeholder='Enter Email'
              name='Email'
              onChange={handleInput}
              className='form-control rounded-0'
              autoComplete='off'
            />
            {errors.Email && <span className='text-danger'>{errors.Email}</span>}
          </div>
          <div className='mb-3'>
            <input
              type="password"
              id="password"
              placeholder='Enter Password'
              name='Password'
              onChange={handleInput}
              className='form-control rounded-0'
            />
            {errors.Password && <span className='text-danger'>{errors.Password}</span>}
          </div>
          <div className='row'>
            <div className='col-4'>
              <button type='submit' id="loginButton" className='btn btn-success w-100 rounded-0'> Log in</button>
            </div>
            <div className='col-4'>
              <div className="mt-1 text-center">
                <p>New User/admin?</p>
              </div>
            </div>
            <div className='col-4'>
              <Link to='/signup' type="button" id='signupLink' className="btn btn-primary rounded-0"> Sign up </Link>
            </div>
            <Outlet />
          </div>
        </form>
      </div>
    </>
<<<<<<< HEAD
    )
  }
  
=======
  )
}

>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
export default Login;
