import React from 'react'
import FutureOrPastInterviewsComponent from '../../../Components/AdminInterviews/PastOrFutureInterview';
import Navbar from "../../../Components/Navbar/Navbar" ;
import DashboardNavbar from "../../../Pages/AdminSidePages/AdminDashBoard/DashboardNavbar";


const PastInterviews = () => {
  const path = window.location.pathname;
  const segments = path.split('/');
  const InterviewsValue = segments[segments.length - 1];
  

  return (
    <div className='container'>
        <Navbar />
      <DashboardNavbar />
      <br/>
      {InterviewsValue ==="past-interviews" ? <FutureOrPastInterviewsComponent />:""}
    </div>
  )
}

export default PastInterviews