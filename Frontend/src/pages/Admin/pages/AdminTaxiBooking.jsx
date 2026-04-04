import { useEffect, useState } from "react";
import axios from "axios";
import './styles/AddDestination.css'

const AdminTaxiBooking = ({ setActivePage, setEditId }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookings, setBookings] = useState([]);
  
  // Fetch all bookings
  const fetchBookings = async () => {
    try {

      const res = await axios.get("https://travel-website-lm4n.onrender.com/api/taxi/taxi-bookings");

      setBookings(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {

    try {

      await axios.put(`https://travel-website-lm4n.onrender.com/api/taxi/update-status/${id}`, { status });

      fetchBookings();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooking = async (id) => {

    if (!window.confirm("Delete this booking?")) return;

    try {

      await axios.delete(`https://travel-website-lm4n.onrender.com/api/taxi/delete-booking/${id}`);

      fetchBookings();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-destination-page">

      {/* Heading */}
      <div className="categories-header">
        <h2>Taxi Booking</h2>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Filter by Status: </label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="destination-table">
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Date</th>
                <th>Passengers</th>
                <th>Car</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.filter((item) => statusFilter === "All" || item.status === statusFilter).map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.pickup}</td>
                <td>{item.drop}</td>
                <td>{item.date}</td>
                <td>{item.passengers}</td>  
                <td>{item.carType}</td>
                <td className={`status ${item.status}`}>
                    {item.status}
                </td>

                <td className="actions">

                    <button
                        className="edit-btn" style={{marginBottom: "5px"}}
                        onClick={() => updateStatus(item._id, "Confirmed")}
                    >
                        Confirm
                    </button> <br />

                    <button
                        className="edit-btn" style={{marginBottom: "5px"}}
                        onClick={() => updateStatus(item._id, "Rejected")}
                    >
                        Reject
                    </button> <br />

                    <button
                        className="edit-btn"
                        onClick={() => deleteBooking(item._id)}
                    >
                        Delete
                    </button> <br />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTaxiBooking;