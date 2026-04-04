import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddDestination.css";

const Admin_District = ({ setActivePage, setEditId }) => {

  const [districts, setDistricts] = useState([]);

  const fetchDistricts = async () => {
    try {
      const res = await axios.get("https://travel-website-lm4n.onrender.com/api/districts");
      setDistricts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://travel-website-lm4n.onrender.com/api/districts/${id}`);
      fetchDistricts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-destination-page">

      {/* Heading */}
      <div className="categories-header">
        <h2>All Districts</h2>

        <button
          className="category-btn"
          onClick={() => setActivePage("createDistrict")}
        >
          Add District
        </button>
      </div>

      {/* Table */}
      <div className="destination-table">
        <table>

          <thead>
            <tr>
              <th>Image</th>
              <th>District Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {districts.map((district) => (
              <tr key={district._id}>

                <td>
                  {district.image && (
                    <img src={district.image} alt={district.name} />
                  )}
                </td>

                <td>{district.name}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(district._id)}
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

export default Admin_District;