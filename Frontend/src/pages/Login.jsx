import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

import "../pages/Admin/pages/styles/CreateAddDestination.css";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://travel-website-lm4n.onrender.com/api/auth/login", formData);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("Login successful");
            navigate("/")
        } catch(err) {
            console.log(err);
            alert(err.response?.data?.message || "Something went wrong");
        }
    }

  return (
    
    <div className="create-page" style={{backgroundColor: "#3CB173" , display:"flex", alignItems:"center", justifyContent: "center"}}>
      <div className="create-card">
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <form className="create-form" onSubmit={handleSubmit}>
          <input style={{padding: "8px"}} name="email" type="email" onChange={handleChange} placeholder="Enter your email" required />
          <input style={{padding: "8px"}} name="password" type="password" onChange={handleChange} placeholder="Enter your password" required />

          <button type="submit" className="create-btn">Login</button>

          <p style={{ textAlign: "center" }}>
            Don’t have an account? {" "} 
            <span style={{cursor:"pointer", color:"blue"}} onClick={() => navigate("/signup")}>Signup</span>
          </p>
        </form>

        <div style={{ display: "flex", alignItems: "center", margin: "15px 0" }}>
          <hr style={{ flex: 1 }} />
          <span style={{ margin: "0 10px" }}>OR</span>
          <hr style={{ flex: 1 }} />
        </div>

        {/* Google Login */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin onSuccess={async (credentialResponse) => {
            console.log("🔥 Google success triggered");
            try {
              const res = await axios.post( "https://travel-website-lm4n.onrender.com/api/auth/google", { token: credentialResponse.credential });localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));

              alert("Google login successful");
              navigate("/");
            } 
            catch (err) {
              console.log(err);
            }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;