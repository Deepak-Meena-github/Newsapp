import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const pageSize=12;
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<News pageSize={pageSize} country="us" category='science' />} />
          <Route path="/business" element={<News pageSize={pageSize} country="us" category='business' />} />
          <Route path="/technology" element={<News pageSize={pageSize} country="us" category='technology' />} />
          <Route path="/health" element={<News pageSize={pageSize} country="us" category='health' />} />
          <Route path="/science" element={<News pageSize={pageSize} country="us" category='science' />} />
          <Route path="/sports" element={<News pageSize={pageSize} country="us" category='sports' />} />
          <Route path="/general" element={<News pageSize={pageSize} country="us" category='general' />} />
          <Route path="/entertainment" element={<News pageSize={pageSize} country="us" category='entertainment' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
