import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        cpid: ''
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.userid) {
            newErrors.userid = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.userid)) {
            newErrors.userid = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin && !formData.cpid) {
            newErrors.cpid = 'CP ID is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        
        if (validateForm()) {
            try {
                const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
                const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
                
                // Store token and user info in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    userid: response.data.userid,
                    cpid: response.data.cpid
                }));
                
                navigate('/home');
            } catch (error) {
                setApiError(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#00a4a6] to-[#008486] px-4 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600 text-center text-sm mb-8">
                    {isLogin 
                        ? 'Please enter your credentials to login' 
                        : 'Fill in your details to create an account'}
                </p>

                {apiError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CP ID
                            </label>
                            <input
                                type="text"
                                name="cpid"
                                value={formData.cpid}
                                onChange={handleInputChange}
                                placeholder="Enter your CP ID"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a4a6] focus:border-transparent transition"
                            />
                            {errors.cpid && (
                                <span className="text-red-500 text-xs mt-1">{errors.cpid}</span>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="userid"
                            value={formData.userid}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a4a6] focus:border-transparent transition"
                        />
                        {errors.userid && (
                            <span className="text-red-500 text-xs mt-1">{errors.userid}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a4a6] focus:border-transparent transition"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#00a4a6] text-white py-3 px-4 rounded-md hover:bg-[#008486] transition duration-200 font-medium"
                    >
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600 text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[#00a4a6] hover:underline font-medium"
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;    