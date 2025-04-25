import React, { useState } from 'react';
import axios from 'axios';

const TestDataUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadStatus('');
        setError('');

        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            setUploadStatus('File uploaded successfully!');
            setFile(null);
            // Reset file input
            e.target.reset();
        } catch (error) {
            setError(error.response?.data?.message || 'Error uploading file');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Test Data Upload</h2>
                    <p className="text-gray-600 mt-2">CP ID: {user.cpid}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload File (CSV or Excel)
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".csv,.xlsx,.xls"
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00a4a6] focus:border-transparent transition"
                        />
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#00a4a6] text-white py-3 px-4 rounded-md hover:bg-[#008486] transition duration-200 font-medium"
                    >
                        Upload File
                    </button>

                    {uploadStatus && (
                        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                            {uploadStatus}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default TestDataUpload; 