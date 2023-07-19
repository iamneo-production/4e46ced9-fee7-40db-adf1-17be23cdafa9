<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"
import HomePage from "./components/HomePage/HomePage";
import AddServiceCenter from "./components/Admin/AddServiceCenter";
import CenterProfile from "./components/Admin/CenterProfile";
import Centeredit from "./components/Admin/Centeredit";
import Dashboard from "./components/Dashboard/Dashboard";
import DisplayDashboard from "./components/Dashboard/DisplayDashboard";
import MyBooking from "./components/MyBooking/MyBooking";
import EditBooking from "./components/MyBooking/EditBooking";
import BillGeneration from "./components/BillGeneration/BillGeneration";
import Review from "./components/Review/Review";
import ThankYou from "./components/Review/ThankYou";

import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/admin" element={<AddServiceCenter />} />
        <Route path="/addServiceCenter" element={<AddServiceCenter />} />
        <Route path="/centerprofile" element={<CenterProfile />} />
        <Route path="/centeredit/:id" element={ <Centeredit />} />
        <Route path="/dashboard" element={<DisplayDashboard />} />
        <Route path='/dashboard/:id' element={<Dashboard />}></Route>
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="/editbooking/:id" element={<EditBooking />}/>
        <Route path="/dashboard/:id" element={<Dashboard />}/>
        <Route path="/BillGeneration/:id" element={<BillGeneration />}/>
        <Route path='/review' element={<Review />}/>
        <Route path='/thankyou' element={<ThankYou />}/>
      </Routes>
    </BrowserRouter>
>>>>>>> 292b65554fc5641304592776031b6cfba8a06c6f
  );
}

export default App;
<<<<<<< HEAD
=======


>>>>>>> 292b65554fc5641304592776031b6cfba8a06c6f
