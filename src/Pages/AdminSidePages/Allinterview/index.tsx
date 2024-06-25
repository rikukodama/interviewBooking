import React from 'react'
import './index.css'
import Navbar from '../../../Components/Navbar/Navbar';
import DashboardNavbar from "../../../Pages/AdminSidePages/AdminDashBoard/DashboardNavbar";
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';


export const Interviews = () =>{

return (
    <div>
    <Navbar />
        {/* <DashboardNavbar /> */}
    <br />
    <Box mt={['5.5cm','4cm','2.7cm']} className='interview_containter'>

    <Box m={'auto'} mt={'15px'} mb={'35px'} width={['85%','65%','40%']}>
    <Link to={'/admin/upcoming-interviews'}>
    <button className='interview_box_btn'>Upcoming-Interviews</button>
    </Link>
    <br />
    <Link to={'/admin/past-interviews'}>
    <button className='interview_box_btn'>Past-Interviews</button>
    </Link>
    </Box>

    <Box m={'auto'} mt={'25px'} mb={'15px'} width={['85%','65%','40%']}>
    <Link to={'/admin/single-interview/create'}>
    <button className='interview_btn'>Create Interviews</button>
    </Link>
    <br />
    <Link to={'/admin/bulk-interview/create'}>
    <button className='interview_btn'>Create Bulk Interviews</button>
    </Link>
    <br />
    <Link to={'/admin/one-on-one-interviews'}>
    <button className='interview_btn'>One-On-One Events</button>
    </Link>
    </Box>

    </Box>
    </div>
)
}