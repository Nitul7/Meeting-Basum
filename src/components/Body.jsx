import '../styles/Body.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Outlet} from 'react-router';

function Body() {
  return (
    <main className="body">
    
      <div className="greeting-section">
       <Outlet />
      </div>

    </main>
  );
}

export default Body;
