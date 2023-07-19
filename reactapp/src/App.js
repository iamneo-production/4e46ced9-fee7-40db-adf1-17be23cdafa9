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
  );
}

export default App;


