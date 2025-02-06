import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import UploadSrs from './pages/upload_srs';
import UploadSourceCode from './pages/upload_code';
import SignUp from './pages/signup';  
import Login from './pages/login';  
import ResetPassword from './pages/ResetPassword';  
import Hero from './components/Hero/Hero';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="overflow-x-hidden bg-white">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Hero />} />
          <Route path="/upload-srs" element={<UploadSrs />} />
          <Route path="/upload-code" element={<UploadSourceCode />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/ResetPassword" element={<ResetPassword/>} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
