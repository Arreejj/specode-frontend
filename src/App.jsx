import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import UploadSrs from './pages/upload_srs';
import UploadSourceCode from './pages/upload_code';
function App() {
  return (
    <Router>
      <Navbar />
      <main className="overflow-x-hidden bg-white">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/upload-srs" element={<UploadSrs />} />
          <Route path="/upload-code" element={<UploadSourceCode />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
