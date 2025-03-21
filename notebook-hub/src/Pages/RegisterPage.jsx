import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function RegisterPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRegister = async () => {
        const formData = new FormData();
        formData.append('user_name', name);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('image', image);

        try {
            const response = await axios.post("http://localhost:9092/user/saveUser", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error("There was an error registering!", error);
        }
    };

    return (
        <div className="w-full h-screen bg-black bg-opacity-20 flex justify-center items-center">
            <div className="w-[400px] p-8 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <input type="text" className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="number" className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md" placeholder="Enter Phone No" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="file" className="w-full mb-4 p-2 text-lg border border-gray-300 rounded-md" onChange={handleImageChange} />
                <button className="w-full p-2 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-800" onClick={handleRegister}>Register</button>
                <Link to="/login" className="block text-center mt-4 text-blue-600 hover:underline">
                    Already Have an Account
                </Link>
            </div>
        </div>
    );
}

export default RegisterPage;
