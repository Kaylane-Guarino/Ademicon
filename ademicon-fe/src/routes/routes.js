import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import Home from '../pages/Home';
import Register from '../pages/Register';
import { ToastContainer } from 'react-toastify';

const PagesRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default PagesRoutes;
