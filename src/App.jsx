import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router";
import './App.css';
import Register from "./pages/Register";
import AppShell from "./layout/AppShell";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Calender from "./pages/Calender";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import JoinMeeting from "./pages/JoinMeeting";
import NewMeeting from "./pages/NewMeeting";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";


function App() {


  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />

        <Route path="profile" element={<Profile />} />
        <Route path="calendar" element={<Calender />} />

        <Route path="meeting">
          <Route path="schedule" element={<ScheduleMeeting />} />
          <Route path="join" element={<JoinMeeting />} />
          <Route path="new" element={<NewMeeting />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default App;
