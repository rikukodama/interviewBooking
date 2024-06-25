import React from "react";
import FutureOrPastInterviewsComponent from "../../../Components/AdminInterviews/PastOrFutureInterview";
import Navbar from "../../../Components/Navbar/Navbar" ;
import DashboardNavbar from "../../../Pages/AdminSidePages/AdminDashBoard/DashboardNavbar";

const FutureInterviews = () => {
  const path = window.location.pathname;
  const segments = path.split("/");
  const futureInterviewsValue = segments[segments.length - 1];

  return (
    <div className="container">
        <Navbar />
      <DashboardNavbar />
      <br/>
      {futureInterviewsValue === "upcoming-interviews" ? (
        <FutureOrPastInterviewsComponent />
      ) : (
        ""
      )}
    </div>
  );
};

export default FutureInterviews;
