import React, { useEffect,useCallback} from "react";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {
  const navigate = useNavigate();

   // when user enters to landing page it checks for username in localstorage and in session storage 
   // if find username find update state in redux based on values 
   // if not find values in local storage  navigate to login
   
   const gotoLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const goToStudentDashboard = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const goToAdminDashboard = useCallback(() => {
    navigate("/admin/dashboard");
  }, [navigate]);
 
   useEffect(() => {
    let usertype;
  

 const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
    usertype = userDetails.user?.roles[0]?.name
    const id = userDetails?.user?.id;
 
   if ( usertype === "ROLE_STUDENT") {
   
     goToStudentDashboard()
    }
    if (usertype === "ROLE_ADMIN") {
    
     goToAdminDashboard()
    }
    if(!id){
      gotoLogin()
      }
  }, [gotoLogin,goToAdminDashboard,goToStudentDashboard]);

  return <div></div>;
};

export default LandingPage;