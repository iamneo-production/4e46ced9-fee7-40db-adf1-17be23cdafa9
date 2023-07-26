import axios from 'axios';
import React, { useState ,useEffect } from 'react'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom'
=======
import { Link, Outlet,useNavigate } from 'react-router-dom'
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
import { Link, Outlet,useNavigate } from 'react-router-dom'
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
=======
import { Link, Outlet,useNavigate } from 'react-router-dom'
>>>>>>> a31a231a81a68b48e94fb97a051418bda8bb1d63
import './Addcenter.css'


function AddServiceCenter() {
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticatedAdmin');
        if (isAuthenticated !== 'true') {
          navigate('/login');
        }
      }, []);
    
      const navigate = useNavigate();
    
      const [values, setValues] = useState({
        serviceCenterID: '',
        serviceCenterName: '',
        serviceCenterPhone: '',
        serviceCenterAddress: '',
        serviceCenterImageUrl: '',
        serviceCentermailId: '',
        serviceCenterCost: '',
        serviceCenterDescription: ''
      });
    
      const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post('https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/addServiceCenter', values)
          .then((res) => {
            navigate('/centerprofile');
          })
          .catch((err) => console.log(err));
      };
    
      function HandleLogout() {
        navigate('/login');
        localStorage.removeItem('authenticatedUser');
        localStorage.removeItem('authenticatedAdmin');
      }

    return(
        <div className='body'><div><br/></div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
         <div className="container-fluid">
             <a className="navbar-brand">Kraft Cam</a>
                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul className="navbar-nav mx-auto">
                         <li className="nav-item">
                             <Link to="/addServiceCenter" className="nav-link active" id='adminAddCenter' aria-current="page">Add Center</Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/centerprofile" className="nav-link" id='adminCenterProfile'>Center Profile</Link>
                         </li>
                     </ul>
                     <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>    
                 </div>                
         </div>
         <Outlet />
         </nav>
         <div className='d-flex justify-content-center align-items-center vh-100 addpage'>
			<form onSubmit={handleSubmit} className='submitformcss'>
			<div className='heading'>
            <h2>Add Center</h2>
            </div>
            <div className="mb-3">
				<input type="text" className="form-control" id="addId" name="serviceCenterID" placeholder='Enter the ID' autoComplete='off'
				onChange={handleInput}/>
			</div>
			<div className="mb-3">
					<input type="text" className="form-control" id="addName" name="serviceCenterName" placeholder='Enter the Name' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3 ">
					<input type="text" className="form-control" id="addNumber" name='serviceCenterPhone' placeholder='Enter the Phone number' autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3">
					<input type="text" className="form-control" id="addAddress" name='serviceCenterAddress' placeholder='Enter the address'
					onChange={handleInput}/>
				</div>
				<div className="mb-3 ">
					<input type="url" className="form-control" id="addImageUrl" name='serviceCenterImageUrl' placeholder="Enter the Image Url" autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3 ">
					<input type="email" className="form-control" id="addEmail" name='serviceCentermailId' placeholder="Enter the mail id" autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3  ">
					<input type="text" className="form-control" id="addServiceCost" name='serviceCenterCost' placeholder="Enter the Servicing Cost of Product" autoComplete='off'
					onChange={handleInput}/>
				</div>
				<div className="mb-3 ">
                    <textarea className="form-control" id="addCentreDescription" name='serviceCenterDescription' rows="3" placeholder="Description about Service center" autoComplete="off"
                    onChange={handleInput}></textarea>
				</div>
				<div className="mb-3">
					<button type="submit" id='addButton' className="btn btn-primary">Add</button>
				</div>
			</form>

            </div>
        </div>
    )
}
export default AddServiceCenter