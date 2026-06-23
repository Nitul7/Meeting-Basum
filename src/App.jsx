import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router";
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

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <AppShell>
            <Dashboard />
          </AppShell>
        }
      />

      <Route
        path="/new-meeting"
        element={
          <AppShell>
            <NewMeeting />
          </AppShell>
        }
      />


    </Routes>
  );
};

export default App;
