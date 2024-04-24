import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/TeacherLogin', formData);
    
            if (response.status === 200) {
                const data = response.data;
                if (data && data._id) {
                    navigate("/teacherDetails", {
                        state: {
                            email: formData.email,
                            teacherId: data._id, 
                            teachSclass: data.teachSclass,
                            teachSubject: data.teachSubject,
                            
                        }
                    });
                } else {
                    setError('Invalid email or password');
                }
            } else {
                setError('Error logging in. Please try again later.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in. Please try again later.');
        }
    };
       
    return (
        <div className="max-w-md p-6 mx-auto mt-8 bg-gray-500 border shadow-md rounded-2xl ">
            <h2 className="mb-4 text-2xl font-semibold">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold text-gray-900">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-bold text-gray-900">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-black"
                        required
                    />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="w-full px-4 py-2 mt-4 text-white border rounded-2xl bg-slate-400 hover:bg-slate-800">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginComponent;