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
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch unread notification count once user is available
  useEffect(() => {
    if (!user) return;

    const fetchUnreadCount = async () => {
      try {
        const res = await axios.get(`https://travel-website-lm4n.onrender.com/api/taxi/notifications/${user._id}`);
        const unread = res.data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchUnreadCount();
  }, [user]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/login");
  };

  // Navigate to Notifications page on bell click
  const handleBellClick = () => {
    navigate("/notifications");
  };

  return (
    <>
      <Navbar expand="lg" className="app-navbar">
        <Container>

          {/* Logo */}
          <Navbar.Brand as={NavLink} to="/" className="navbar-logo">
            <img src={logo} alt="Touria Logo" />
          </Navbar.Brand>

          {/* Hamburger */}
          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar" className="align-items-center">

            {/* CENTER NAV LINKS */}
            <Nav className="mx-auto align-items-center flex-grow-1 justify-content-center">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/destinations">Destinations</Nav.Link>
              <Nav.Link as={NavLink} to="/tourPackages">Tour Packages</Nav.Link>
              <Nav.Link as={NavLink} to="/taxiBooking">Taxi Booking</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            </Nav>

            {/* RIGHT — BELL + AUTH (inside Collapse so it works on mobile) */}
            <div className="navbar-right">

              {/* Bell Icon — navigates to /notifications */}
              <div className="bell-icon" onClick={handleBellClick} title="Notifications">
                <FaBell />
                {unreadCount > 0 && (
                  <span className="badge">{unreadCount}</span>
                )}
              </div>

              {/* Auth */}
              <div className="navbar-auth">
                {user ? (
                  <>
                    <span className="navbar-user">Hi, {user.name.split(" ")[0]}</span>
                    <button className="btn-login" onClick={() => setShowLogoutModal(true)}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button className="btn-login">Login</Button>
                  </Link>
                )}
              </div>

            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-box">
            <h4>Confirm Logout</h4>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="confirm-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;