import { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom"; 
import axios from "axios"; 
import './NavigationBar.css'; 
import logo from '../../assets/Logo/logo.png'; 
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; 
import { FaBell } from "react-icons/fa"; 

const NavigationBar = () => { 
  const [user, setUser] = useState(null); 
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const [notifications, setNotifications] = useState([]); 
  const [showNotifications, setShowNotifications] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => { 
    if (!user) return; 

    const fetchNotifications = async () => { 
      try { 
        const res = await axios.get( `http://localhost:5000/api/taxi/notifications/${user._id}` ); 
          setNotifications(res.data); 
      } 
      catch (err) { 
        console.log(err); 
      } 
    }; 

    fetchNotifications(); 
  
  }, [user]); 
  
  useEffect(() => { 
    const storedUser = localStorage.getItem("user"); 
    
    if (storedUser) { 
      setUser(JSON.parse(storedUser)); 
    } 
  }, []); 
  
  // ✅ Logout Function 
  const handleLogout = () => { 
    localStorage.removeItem("user"); 
    localStorage.removeItem("token"); 
    setShowLogoutModal(false); 
    navigate("/login"); 
  }; 

  const markAsRead = async (id) => {
      try {
        await axios.put(`http://localhost:5000/api/taxi/notifications/${id}`);

        // update UI instantly
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === id ? { ...n, read: true } : n
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

    const deleteNotification = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/taxi/notifications/${id}`
    );

    // remove from UI instantly
    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );
  } catch (err) {
    console.log(err);
  }
};
  
  return ( 
    <> 
      <Navbar expand='lg' className='app-navbar'> 
        <Container> 
          
          {/* Logo */} 
          <Navbar.Brand as={NavLink} to='/' className='navbar-logo'> 
            <img src={logo} alt="Touria Logo" /> 
          </Navbar.Brand> 
          
          {/* Hamburger */} 
          <Navbar.Toggle aria-controls="main-navbar" /> 
          
          <Navbar.Collapse id="main-navbar" className="align-items-center">

          {/* CENTER LINKS */}
          <Nav className="mx-auto align-items-center flex-grow-1 justify-content-center">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/destinations">Destinations</Nav.Link>
            <Nav.Link as={NavLink} to="/tourPackages">Tour Packages</Nav.Link>
            <Nav.Link as={NavLink} to="/taxiBooking">Taxi Booking</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* RIGHT - AUTH */} 
          <div className="notification-wrapper"> 
            <div className="bell-icon" onClick={() => navigate("/notifications")} > 
              <FaBell /> 
              {notifications.filter(n => !n.read).length > 0 && ( 
                <span className="badge"> 
                  {notifications.filter(n => !n.read).length} 
                </span> 
              )} 
            </div> 
            
            {/* DROPDOWN */} 
            {showNotifications && ( 
              <div className="notification-overlay" onClick={() => setShowNotifications(false)}> 
                <div className="notification-panel" onClick={(e) => e.stopPropagation()}> 
                  <h4>Notifications</h4> 
                    {notifications.length === 0 ? ( <p>No notifications</p> ) : ( notifications.map((n) => ( 
                      <div key={n._id} className={`notification-item ${n.read ? "" : "unread"}`}>
                        <span onClick={() => markAsRead(n._id)} style={{ flex: 1 }}> {n.message}</span>

                    <button className="delete-btn" onClick={(e) => { e.stopPropagation(); // prevent markAsRead
                                                                    deleteNotification(n._id);}}> Clear </button>

                    </div> 

                  )) )} 
                  </div> 
                </div> )} </div> 
                
                <div className="navbar-auth" style={{paddingLeft:"30px"}}> 
                  {user ? ( <> <span className="navbar-user"> Hi, {user.name.split(" ")[0]} </span> 
                  
                  <button className="btn-login" onClick={() => setShowLogoutModal(true)} > Logout </button> 
                  </> ) : ( <Link to="/login"> <Button className="btn-login">Login</Button> </Link> )} </div> 
                  </Navbar.Collapse> 
                  </Container> 
                  
                  </Navbar> 
                  
                  {/* ✅ LOGOUT MODAL */} 
                  
                  {showLogoutModal && ( 
                    <div className="logout-modal-overlay"> 
                      <div className="logout-modal-box"> 
                        <h4>Confirm Logout</h4> 
                        <p>Are you sure you want to logout?</p> 
                        <div className="logout-modal-actions"> 
                          <button className="cancel-btn" onClick={() => setShowLogoutModal(false)} > Cancel </button> 
                          <button className="confirm-logout-btn" onClick={handleLogout} > Logout </button> 
                        </div> 
                      </div> 
                    </div>
                  )} 
                </> ) } 
                
                
export default NavigationBar;