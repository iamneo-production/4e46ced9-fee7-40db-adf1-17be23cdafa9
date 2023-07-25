import'./BillGeneration.css';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import React, { useEffect, useState, useRef } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
// Define the styles for the PDF document

function BillGeneration() {
  const pageRef = useRef();
  const navigate=useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const { id } = useParams();
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await axios.get(`https://8080-fdfacfbeafebeebdaeeadfabafceaa.project.examly.io/api/Appointment/generateBill/${id}`);
        const { data } = response;
        setBillData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bill data:', error);
        setLoading(false);
      }
    };

    fetchBillData();
  }, [id]);

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!billData) {
    return <div>Error: Failed to fetch bill data</div>;
  }

  const handleDownload = async () => {
    const options = {
      margin: 0.5,
      filename: 'bill.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Create a clone of the container element without the download button
    const containerClone = pageRef.current.cloneNode(true);
    const downloadButton = containerClone.querySelector('.download-btn');
    if (downloadButton) {
      downloadButton.remove();
    }
    const navitem = containerClone.querySelector('.nav-item');
    if(navitem){
      navitem.remove();
    }

    // Dynamically load html2pdf.js library
    const html2pdfInstance = html2pdf();
    html2pdfInstance.set(options).from(containerClone).save();
    navigate('/review');
  };

  return (
    <div ref={pageRef} className="container">
       
      <div className="heading">
        <h1>Kraft Cam</h1>
      </div>
      <div className="current-date">
      <p><strong>Date:</strong>{currentDate}</p>
      <p><strong>Bill ID:</strong> {billData.billID}</p>
      </div>
      
      <div className="customer-details">
        <h3>Customer Details</h3>
        <p><strong>User ID:</strong> {billData.userID}</p>
        <p><strong>Contact Number:</strong>{billData.contactNumber}</p>
        <p><strong>Email:</strong>{billData.userEmail}</p>
      </div>

      <div className="product-details">
        <h3>Product Details</h3>
        <p><strong>Model Name:</strong> {billData.productName}</p>
        <p><strong>Model No:</strong> {billData.productModelNo}</p>
        <p><strong>Date of Purchase:</strong> {billData.dateOfPurchase}</p>
        <p><strong>Problem Description:</strong> {billData.problemDescription}</p>
      </div>   

      <table className="table">
        <thead>
          <tr>
            <th>Date of Appointment</th>
            <th>Servicing Cost</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{billData.availableSlots}</td>
            <td>Rs.{billData.serviceCenterCost}</td>
            <td>Rs.{billData.serviceCenterCost}</td>
          </tr>
        </tbody>
      </table>
        
      <div className="service-center-details">
        <h3>Service Center Details</h3>
        <div className="detail-item">
          <p><strong>Name:</strong></p>
          <p>{billData.serviceCenterName}</p>
        </div>
        <div className="detail-item">
          <p><strong>Phone:</strong></p>
          <p>{billData.serviceCenterPhone}</p>
        </div>
        <div className="detail-item">
          <p><strong>Address:</strong></p>
          <p>{billData.serviceCenterAddress}</p>
        </div>
      </div>
      {/* Add additional sections or tables as needed */}

      <div className="download-btn">
        <button onClick={handleDownload}>Download PDF</button>
      </div>
    </div>
  );
}

export default BillGeneration;