import './Taxi.css'
import { useState } from "react";
import axios from 'axios';
import { FaLocationDot, FaCarSide, FaUser, FaPhone } from "react-icons/fa6";

const Taxi = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        pickup: "",
        drop: "",
        date: "",
        time: "",
        passengers: "",
        carType: "",
        message: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Please login first");
                return;
            }

            const res = await axios.post("https://travel-website-lm4n.onrender.com/api/taxi/book-taxi", { ...formData, userId: user?._id });

            alert("Taxi booked successfully 🚖")

            setFormData({
                name: "",
                phone: "",
                pickup: "",
                drop: "",
                date: "",
                time: "",
                passengers: "",
                carType: "",
                message: ""
            });

            console.log(res.data)

        } 
        catch (error) {
            alert("Booking failed")
            console.error(error)
        }
        
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  return (
    <div className="taxi-container">
        <div className="container">
            <div className="taxi-card">
                <h2 className="taxi-title">Book Your Taxi</h2>
                <form onSubmit={handleSubmit} className="taxi-form">
                    <div className="taxi-input">
                        <FaUser className="taxi-icon" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="taxi-input">
                        <FaPhone className="taxi-icon" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="taxi-input">
                        <FaLocationDot className="taxi-icon" />
                        <input
                            type="text"
                            name="pickup"
                            placeholder="Pickup Location"
                            value={formData.pickup}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="taxi-input">
                        <FaLocationDot className="taxi-icon" />
                        <input
                            type="text"
                            name="drop"
                            placeholder="Drop Location"
                            value={formData.drop}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="taxi-row">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="taxi-row">
                        <input
                            type="number"
                            name="passengers"
                            placeholder="Passengers"
                            value={formData.passengers}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="carType"
                            value={formData.carType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Car Type</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Van">Van</option>
                        </select>
                    </div>

                    <textarea
                        name="message"
                        placeholder="Additional Message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    <button type="submit" className="taxi-btn">
                        <FaCarSide /> Book Taxi
                    </button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Taxi