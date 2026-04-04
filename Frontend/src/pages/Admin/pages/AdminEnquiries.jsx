import { useEffect, useState } from "react";
import axios from "axios";
import './styles/AddDestination.css'

const AdminEnquiries = () => {

  const [enquiries, setEnquiries] = useState([]);

  // Fetch all enquiries
  const fetchEnquiries = async () => {
    try {
      const res = await axios.get("https://travel-website-lm4n.onrender.com/api/enquiries/enquiries");
      setEnquiries(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Delete enquiry
  const deleteEnquiry = async (id) => {

    if (!window.confirm("Delete this enquiry?")) return;

    try {
      await axios.delete(`https://travel-website-lm4n.onrender.com/api/enquiries/delete-enquiry/${id}`);
      fetchEnquiries();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-destination-page">

      <div className="categories-header">
        <h2>Customer Enquiries</h2>
      </div>

      <div className="destination-table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((item) => (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => deleteEnquiry(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminEnquiries;