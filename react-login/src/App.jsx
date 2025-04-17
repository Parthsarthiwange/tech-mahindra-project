import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import GRCP from './pages/GRCP';
import LRCP from './pages/LRCP';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/grcp" element={<GRCP />} />
        <Route path="/lrcp" element={<LRCP />} />
      </Routes>
    </Router>
  );
}

export default App;
