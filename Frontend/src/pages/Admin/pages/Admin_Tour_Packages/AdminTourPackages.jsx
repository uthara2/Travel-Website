import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddDestination.css";
import Pagination from "../../../../components/Pagination/Pagination";

const AdminTourPackages = ({ setActivePage, setEditId }) => {
  const [packages, setPackages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentPackages = packages.slice(indexOfFirst, indexOfLast);  

  // Fetch all destinations
  const fetchPackages = async () => {
    try {
      const res = await axios.get("https://travel-website-lm4n.onrender.com/api/packages");
      setPackages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPackages(); 
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await axios.delete(`https://travel-website-lm4n.onrender.com/api/packages/delete/${id}`);
      fetchPackages();
    } 
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-destination-page">

      {/* Heading */}
      <div className="categories-header">
        <h2>Tour Packages</h2>
        <button className="category-btn" onClick={() => setActivePage("createTourPackages")}>
          Add Tour Package
        </button>
      </div>

      {/* Table */}
      <div className="destination-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Max Persons</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentPackages.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.image && (
                    <img src={item.image} alt={item.title} />
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.destination}</td>
                <td>₹{item.price}</td>
                <td>{item.duration}</td>
                <td>{item.maxPersons}</td>
                <td className={`status ${item.status}`}>
                  {item.status}
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditId(item._id);
                      setActivePage("updateTourPackages");
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>

        <Pagination
              totalItems={packages.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
          />
          
      </div>
    </div>
  )
}

export default AdminTourPackages