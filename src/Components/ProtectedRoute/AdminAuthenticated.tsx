import React from 'react'
import { Navigate, Outlet } from "react-router-dom";



const AdminAuthenticated = () => {

 
 const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

const userType = userDetails?.user?.roles[0]?.name
console.log(userType)
    if( userType?.trim() === "ROLE_ADMIN"){
        return <Outlet /> 
         }else{
           return <Navigate to="/login" replace />;
         }
}

export default AdminAuthenticated