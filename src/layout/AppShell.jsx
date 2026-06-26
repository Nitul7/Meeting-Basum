import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';


function AppShell() {
    const { accessToken } = useAuth();

    console.log("AppShell");
    console.log(accessToken);

    if (!accessToken) {
        return <Navigate to="/login" />;
    }
    return (
        <div className="app">
            <Sidebar />
            <div className="app-container">
                <Navbar />
                <div className="main-content">
                    <div className="main-content-container">
                        <Outlet />
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    );
}

export default AppShell;