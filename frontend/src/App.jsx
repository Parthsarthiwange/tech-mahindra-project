import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import GRCP from './pages/GRCP';
import LRCP from './pages/LRCP';
import TestDataUpload from './pages/TestDataUpload';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/home" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path="/home" element={
          <PrivateRoute>
            <Home setIsAuthenticated={setIsAuthenticated} />
          </PrivateRoute>
        } />
        <Route path="/grcp" element={
          <PrivateRoute>
            <GRCP setIsAuthenticated={setIsAuthenticated} />
          </PrivateRoute>
        } />
        <Route path="/lrcp" element={
          <PrivateRoute>
            <LRCP setIsAuthenticated={setIsAuthenticated} />
          </PrivateRoute>
        } />
        <Route path="/test-data-upload" element={
          <PrivateRoute>
            <TestDataUpload setIsAuthenticated={setIsAuthenticated} />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
