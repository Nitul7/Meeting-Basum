import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Routes,Route } from "react-router";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppShell from "./layout/AppShell";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Calender from "./pages/Calender";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import JoinMeeting from "./pages/JoinMeeting";
import NewMeeting from "./pages/NewMeeting";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="calender" element={<Calender />} />
        <Route path="schedule-meeting" element={<ScheduleMeeting />} />
        <Route path="join-meeting" element={<JoinMeeting />} />
        <Route path="new-meeting" element={<NewMeeting />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
