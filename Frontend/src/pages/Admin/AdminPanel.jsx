import { useState } from "react"
import { FaMapMarkedAlt, FaList, FaCar, FaBox, FaLandmark, FaUser, FaQuestion } from "react-icons/fa";

import './AdminPanel.css'

import AddDestination from "./pages/AddDestination";
import CreateAddDestination from "./pages/CreateAddDestination";
import UpdateAddDestination from "./pages/UpdateAddDestination";

import Categories from './pages/Categories'
import CreateCategory from "./pages/CreateCategory";
import UpdateCategory from "./pages/UpdateCategory";

import AdminTaxiBooking from "./pages/AdminTaxiBooking";

import AdminTourPackages from "./pages/Admin_Tour_Packages/AdminTourPackages";
import CreateTourPackages from "./pages/Admin_Tour_Packages/CreateTourPackages";
import UpdateTourPackages from "./pages/Admin_Tour_Packages/UpdateTourPackages";

import AdminDistrict from "./pages/District/Admin_District";
import CreateDistrict from './pages/District/Admin_AddDistrict';

import AdminUsers from "./pages/AdminUsers";
import AdminEnquiries from "./pages/AdminEnquiries";

const AdminPanel = () => {
  const [activePage, setActivePage] = useState("users")
  const [editId, setEditId] = useState(null);

  const pages = {
    users: <AdminUsers />,

    tourist: (
      <AddDestination
        setActivePage={setActivePage}
        setEditId={setEditId}
      />
    ),
    create: <CreateAddDestination setActivePage={setActivePage} />,
    update: (
      <UpdateAddDestination
        editId={editId}
        setActivePage={setActivePage}
      />
    ),

    category: (
      <Categories
        setActivePage={setActivePage} 
        setEditId={setEditId}
      />
    ),
    createCategory: <CreateCategory setActivePage={setActivePage} />,
    updateCategory: (
      <UpdateCategory
        editId={editId}
        setActivePage={setActivePage}
      />
    ),

    taxiBookings: <AdminTaxiBooking />,

    tourPackages: (
      <AdminTourPackages
        setActivePage={setActivePage}
        setEditId={setEditId}
       />
    ),
    createTourPackages: <CreateTourPackages setActivePage={setActivePage} />,
    updateTourPackages: (
      <UpdateTourPackages 
        editId={editId}
        setActivePage={setActivePage}
      />
    ),

    district: (
      <AdminDistrict
        setActivePage={setActivePage} 
        setEditId={setEditId}
      />
    ),
    createDistrict: <CreateDistrict setActivePage={setActivePage} />,
    
    enquiries: <AdminEnquiries />,
  };
  
  return (
    <div className="admin-wrapper">
      <div className="admin-sidebar">
        <h2 className="admin-logo">Travel Admin</h2>
        <ul className="admin-menu">
          <li className={activePage === "users" ? "active" : ""} onClick={() => setActivePage("users")}>
            <FaUser />
            Users
          </li>
          <li className={activePage === "tourist" ? "active" : ""} onClick={() => setActivePage("tourist")}>
            <FaMapMarkedAlt />
            Tourist Places
          </li>
          <li className={activePage === "category" ? "active" : ""} onClick={() => setActivePage("category")}>
            <FaList />
            Categories
          </li>
          <li className={activePage === "taxiBookings" ? "active" : ""} onClick={() => setActivePage("taxiBookings")}>
            <FaCar />
            Taxi Bookings
          </li>
          <li className={activePage === "tourPackages" ? "active" : ""} onClick={() => setActivePage("tourPackages")}>
            <FaBox />
            Tour Packages
          </li>
          <li className={activePage === "district" ? "active" : ""} onClick={() => setActivePage("district")}>
            <FaLandmark />
            District
          </li>
          <li className={activePage === "enquiries" ? "active" : ""} onClick={() => setActivePage("enquiries")}>
            <FaQuestion />
            Enquiries
          </li>
        </ul>
      </div>

      <div className="admin-content">
        {pages[activePage]}
      </div>
    </div>
  )
}

export default AdminPanel