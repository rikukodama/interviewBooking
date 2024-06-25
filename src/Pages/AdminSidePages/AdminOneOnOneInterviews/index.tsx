import React from 'react'
import Navbar from "../../../Components/Navbar/Navbar" ;
import OneOnOneEventsNav from './OneOnOneEventsNav';
import OneOnOnOneSearch from '../../../Components/AdminInterviews/OneOnOneSearch';
import SlotsDashboard from '../../../Components/SlotsDashBoard/SlotsDashboard';


const OneonOneEvents= () => {
  const path = window.location.pathname;
  const segments = path.split('/');
  const InterviewsValue = segments[segments.length - 1];
  

  return (
    <div className='container'>
  <Navbar />
  <OneOnOneEventsNav />
  <br/>
  <SlotsDashboard />
      {InterviewsValue ==="one-on-one-interviews" ? <OneOnOnOneSearch />:""}
    </div>
  )
}

export default OneonOneEvents