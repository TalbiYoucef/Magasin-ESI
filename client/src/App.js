import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
  <div>
    <Navbar />
    <Routes>
      {/* // routes to the pages included in the app */}
      {/* 
      // the element attreibute of the <Route> points to the pages components
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> 
      */}
    </Routes>
  </div>
</Router>
);
  
}

export default App;
