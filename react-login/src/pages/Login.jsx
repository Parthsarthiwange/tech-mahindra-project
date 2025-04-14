import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }
            if (!formData.phone) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(formData.phone)) {
                newErrors.phone = 'Invalid phone number';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically make an API call to your backend
            console.log('Form submitted:', formData);
            // For demo purposes, let's just show an alert
            alert(isLogin ? 'Login successful!' : 'Account created successfully!');
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a4a6] focus:border-transparent transition"
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-xs mt-1">{errors.name}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a4a6] focus:border-transparent transition"
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-xs mt-1">{errors.phone}</span>
                                )}
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a4a6] focus:border-transparent transition"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1">{errors.email}</span>
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