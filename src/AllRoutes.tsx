import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OneonOneEventsCreate from './Pages/AdminSidePages/AdminOneOnOneCreate'
import OneonOneEvents from './Pages/AdminSidePages/AdminOneOnOneInterviews'
import StudentBooking from './Pages/StudentSidePages/StudentOneOnOneInterview/index';
import GotoOneOffMeet from './Pages/AdminSidePages/OneOffMeeting'
import UserDashboard from './Pages/UserDashboard/UserDashboard'
import BookOneOnOne from './Pages/BookInterviews/BookOneOnOne'
import InterviewDetails from './Pages/UserInterviewDetails/InterviewDetails'
import OneOnOneSlotsView from './Pages/AdminSidePages/OneOnOneSlotsView'
import CreateBulkEvent from './Pages/AdminSidePages/AdminBulkEventSchedule/AdminBulkEventCreate'
import { CreateSingleInterview } from './Pages/AdminSidePages/AdminBulkEventSchedule/AdminInterviewCreate'
import { LoginUser } from './Pages/Login/LoginUser'
import AdminDashBoard from './Pages/AdminSidePages/AdminDashBoard'
import AddStudents from './Pages/AdminSidePages/AddStudents'
import PastEvents from './Pages/PastEvents/PastEvents';
import PastInterviews from './Pages/AdminSidePages/AdminPastInterviews/index';
import AddDaysAvailability from './Pages/AdminSidePages/AddAvailabilityForSlots/index';
import FutureInterviews from './Pages/AdminSidePages/FutureInterviews/index';
import OneonOneSlotsEdit from './Pages/AdminSidePages/OneOnOneSlotsEdit';
import AdminInterviewDetailPage from './Pages/AdminSidePages/AdminInterviewDetailPage';
import { UpdateSingleInterview } from './Pages/AdminSidePages/AdminInterviewUpdate';
import SingleRecurringEventDetails from './Pages/AdminSidePages/SingleRecurringEventDetails';
import AdminAuthenticated from './Components/ProtectedRoute/AdminAuthenticated';
import StudentAuthenticated from './Components/ProtectedRoute/StudentAuthenticate';
import LandingPage from './Components/ProtectedRoute/LandingPage';
import SlotDetails from './Pages/AdminSidePages/OneOnOneSlotsView/SlotDetails';
import { Interviews } from './Pages/AdminSidePages/Allinterview';
import { ForgetPassword } from './Pages/Login/ForgetPassword';


const AllRoutes = () => {
  return (
    <div>
      <Routes>
       
        <Route path="/login" element={<LoginUser />} />
        <Route path="/login/forgot-password" element={<ForgetPassword />} />
        <Route path="/" element={<LandingPage />} />
        <Route element = {<AdminAuthenticated/>}>
            <Route path ="/admin/one-on-one-interviews" element={<OneonOneEvents/>}/>
            <Route path ="/admin/slots/view" element={<OneOnOneSlotsView/>}/>
            <Route path ="/admin/one-on-one-interviews/create" element={<OneonOneEventsCreate/>}/>
            <Route path ="/admin/one-on-one-interviews/:id/edit" element={<OneonOneSlotsEdit/>}/>
            <Route path ="/admin/:id/recurring-event-details" element={<SingleRecurringEventDetails />}/> 
            <Route path ="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path ="/admin/upcoming-interviews" element={<FutureInterviews/>}/>
            <Route path ="/admin/add-availability" element={<AddDaysAvailability/>}/>
            <Route path ="/admin/past-interviews" element ={<PastInterviews />} />
            <Route path ="/admin/add-students"  element ={<AddStudents/>} />
            <Route path ="/admin/slots/view" element ={<OneOnOneSlotsView/>} />
            <Route path ="/admin/slots/view/:id" element ={<SlotDetails/>} />
            <Route path ="/admin/one-on-one-interviews/create/on-off-meet" element={<GotoOneOffMeet /> } />   
            <Route path="/admin/bulk-interview/create" element={<CreateBulkEvent />} />
            <Route path='/admin/single-interview/create' element={<CreateSingleInterview />} />
            <Route path='/admin/dashboard/interview/:id' element={<AdminInterviewDetailPage />}/>
            <Route path='/admin/single-interview/edit/:id' element={<UpdateSingleInterview />}/>
            <Route path='/admin/Interviews' element={<Interviews/>}></Route>
        
</Route>

<Route element = {<StudentAuthenticated/>}>
            <Route path ="/book-one-on-one/admin/:id" element={<StudentBooking />}/>
            <Route path ="/book-one-on-one/:id"  element ={<StudentBooking/>} />
            <Route path='/dashboard' element={<UserDashboard />} />
            <Route path={"/dashboard/book-one-on-One"}  element={<BookOneOnOne />} />
            <Route path={"/dashboard/interview/:id"}  element={<InterviewDetails />} />
            <Route path='/dashboard/past-events' element={<PastEvents />} />
            </Route>
            </Routes>
    </div>
  )
}

export default AllRoutes