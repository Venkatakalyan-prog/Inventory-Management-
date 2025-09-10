import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.status === 201) {
                alert(data.message);
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="form-control my-2" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control my-2" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control my-2" required />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Signup;
