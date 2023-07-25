import './Addcenter.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate,useParams,Link, Outlet } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Centeredit(){
    const navigate = useNavigate()
    useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  }, []);
    const [data, setData] = useState([]);
    const [values,setValues]=useState({
      serviceCenterID: '',
      serviceCenterName: '',
      serviceCenterPhone: '',
      serviceCenterAddress: '',
      serviceCenterImageUrl: '',
      serviceCentermailId: '',
      serviceCenterCost: '',
      serviceCenterDescription: ''
        })
    const { id } = useParams();

    const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: event.target.value }))
    }
      
    useEffect(() => {
        axios.get('https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/getdetails/'+id)
        .then(res => {
          if (res.data.status === 'Success') {
            const serviceCenters = res.data.result;
            setValues({
            serviceCenterID: serviceCenters.serviceCenterID,
            serviceCenterName: serviceCenters.serviceCenterName,
            serviceCenterPhone: serviceCenters.serviceCenterPhone,
            serviceCenterAddress: serviceCenters.serviceCenterAddress,
            serviceCenterImageUrl: serviceCenters.serviceCenterImageUrl,
            serviceCentermailId: serviceCenters.serviceCentermailId,
            serviceCenterCost: serviceCenters.serviceCenterCost,
            serviceCenterDescription: serviceCenters.serviceCenterDescription,
            });
          }})
        .catch(err => console.log(err));
      }, [id]);


      const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/editServiceCenter/'+id, values)
        .then(res => {
          if (res.status === 200) {
            navigate('/centerprofile');
          }
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
            console.log(error.response.data.errors); // Detailed validation errors
          } else {
            console.log(error.message); // General error message if the response or errors are not available
          }
        });
    }
//for fetching data to display
useEffect(() => {
    axios
      .get('https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/getdetails')
      .then((res) => {
        if (res.data.status === 'Success') {
          setData(res.data.result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

 //for delete    
 const handleDelete = (id) => {
    axios
      .delete(`https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/deleteServiceCenter/${id}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(true);
        } else if (res.status === 404) {
          alert('Service center not found');
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };
  

    function HandleLogout(){
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
                             <Link to="/addServiceCenter" className="nav-link" id='adminAddCenter' aria-current="page">Add Center</Link>
                         </li>
                         <li className="nav-item">
                             <Link to="/centerprofile" className="nav-link active" id='adminCenterProfile'>Center Profile</Link>
                         </li>
                     </ul>
                     <a className="logout" id='logout' onClick={HandleLogout}>Logout</a>  
                 </div>                
         </div>
         <Outlet />
         </nav>
        <div className="container-fluid" >
        <div className="row">
        <div className='col-4 vh-auto addpage'>
        {data.map(item => (
            <div className="card" id='adminProfileView' key={item.serviceCenterID}>
                <div className="cards-container" id='adminProfileView'>
                    <h4><b>{item.serviceCenterName}</b></h4>
                    <div className='row'>
                    <div className='col-9'>
                            <p>Address: {item.serviceCenterAddress}</p>
                        </div>
                        <div className='col-3'>
                            <button onClick={e=>handleDelete(item.serviceCenterID)} id='deleteCenter'> <FaTrash /></button>
                        </div>
                        <div className='col-9'>
                        <p>Mail Id:  {item.serviceCentermailId}</p>
                        </div>
                        <div className='col-3'>
                            <Link to={'/centeredit/'+item.serviceCenterID} id='editCenter'> <FaEdit /></Link>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
            <div className='col-8  updateform'>
                <form className='formcss' onSubmit={handleSubmit}>
                <div className='heading'>
                <h2>Edit Center</h2>
                </div>
                    <div className="mb-3 d-flex align-items-center">
                    <input type="text" className="form-control" id="editId" name="serviceCenterID" placeholder='Enter the ID' autoComplete='off' onChange={handleInput} value={values.serviceCenterID}/>
                    </div>        
                    <div className="mb-3 d-flex align-items-center">
                    <input type="text" className="form-control" id="editName" name="serviceCenterName" placeholder='Enter the Name' autoComplete='off' onChange={handleInput} value={values.serviceCenterName}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="text" className="form-control" id="editNumber" name='serviceCenterPhone' placeholder='Enter the Phone number' autoComplete='off' onChange={handleInput} value={values.serviceCenterPhone}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="text" className="form-control" id="editAddress" name='serviceCenterAddress' placeholder='Enter the address' onChange={handleInput} value={values.serviceCenterAddress}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="url" className="form-control" id="editImageUrl" name='serviceCenterImageUrl' placeholder="Enter the Image Url" autoComplete='off' onChange={handleInput} value={values.serviceCenterImageUrl}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="email" className="form-control" id="editEmail" name='serviceCentermailId' placeholder="Enter the mail id" autoComplete='off' onChange={handleInput} value={values.serviceCentermailId}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <input type="text" className="form-control" id="editServiceCost" name='serviceCenterCost' placeholder="Enter the Service Amount" autoComplete='off' onChange={handleInput} value={values.serviceCenterCost}/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <textarea className="form-control" id="editCentreDescription" name='serviceCenterDescription' rows="3" placeholder="Description about Service center" autoComplete="off" onChange={handleInput} value={values.serviceCenterDescription}></textarea>
                    </div>
                    <div className="mb-3">
                        <button type="submit" id='updateButton' className="btn btn-primary">update</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
     )
}
export default Centeredit