import React, { useState } from "react";
import axios from 'axios';
import SignupAuth from "../Auth/SignupAuth";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup() {
  const [values, setValues] = useState({
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState('');

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = SignupAuth(values);
    setErrors(validationErrors);

    if (
      validationErrors.Email === "" &&
      validationErrors.Password === "" &&
      validationErrors.Username === "" &&
      validationErrors.MobileNumber === "" &&
      validationErrors.UserRole === ""
    ) {
<<<<<<< HEAD
      const randomId = Math.floor(Math.random() * 1000000);
      const updatedValues = {
        ...values,
        Id: randomId,
=======
      const updatedValues = {
        ...values,
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
      };
      try {
        await axios.post('https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/registration', updatedValues);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

    return(
        <>
        <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Register</strong>
        </div>
        <br/>
        <div className='d-flex justify-content-center align-items-center vh-100 SignupPage'>
                    <form onSubmit={handleSubmit} className="signupForm">
                        <div className='mb-3'>
                            <input type="text" id="admin/user" placeholder='Enter admin/user' name='UserRole'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.UserRole && <span className='text-danger'>{errors.UserRole}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="email" id="email" placeholder='Enter Email' name='Email'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.Email && <span className='text-danger'>{errors.Email}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="username" placeholder='Enter Username' name='Username'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.Username && <span className='text-danger'>{errors.Username}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="mobileNumber" placeholder='Enter Mobilenumber' name='MobileNumber'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.MobileNumber && <span className='text-danger'>{errors.MobileNumber}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="password" placeholder='Password' name='Password'
                            onChange={handleInput} className='form-control rounded-0' />
                            {errors.Password && <span className='text-danger'>{errors.Password}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="confirmPassword" placeholder='Confirm Password' name='confirmPassword'
                            onChange={handleInput} className='form-control rounded-0' />
                            {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
                        </div>
                        <div>
                            <div className='col'>
                                <button type='submit' id="submitButton" className='btn btn-success w-100 rounded-0'> Submit</button>
                            </div>
                            <div className='d-flex justify-content-center'>
                               <p>Already an user?</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Link to='/login' type="button" id='loginButton' className="btn btn-primary rounded-0"> Login </Link>
                            </div>
                            <Outlet/>
                        </div> 
                    </form>
                </div>
    </>
    )
}

export default Signup