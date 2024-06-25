import React from 'react'
import { Navigate, Outlet } from "react-router-dom";



const StudentAuthenticated = () => {

 
 const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

const userType = userDetails?.user?.roles[0]?.name
  
    if( userType?.trim() === "ROLE_STUDENT"){
        return <Outlet /> 
         }else{
           return <Navigate to="/login" replace />;
         }
}

export default StudentAuthenticated