import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../pages/Admin/pages/styles/CreateAddDestination.css";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/auth/signup", formData);
            alert("Signup successful");
            navigate("/login")
        } 
        catch (error) {
          alert(error.response?.data?.message || "Error");
        }
    }
  return (
    <div className="create-page" style={{ backgroundColor: "#3CB173", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="create-card">
        <h2 style={{ textAlign: "center" }}>Signup</h2>

        <form className="create-form" onSubmit={handleSubmit}>
          <input style={{padding: "8px"}} name="name" onChange={handleChange} placeholder="Full Name" required />
          <input style={{padding: "8px"}} name="mobile" type="tel" onChange={handleChange} placeholder="Mobile" required />
          <input style={{padding: "8px"}} name="email" type="email" onChange={handleChange} placeholder="Email" required />
          <input style={{padding: "8px"}} name="password" type="password" onChange={handleChange} placeholder="Password"  required />

          <button type="submit" className="create-btn" >Signup</button>

          <p style={{ textAlign: "center" }}>
            Already have an account?
            <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/login")}> Login </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;