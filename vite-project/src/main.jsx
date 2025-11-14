import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Bu qismlar to'g'ri
import App from './App';
import './index.css';
import { VideoProvider } from './context/VideoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <VideoProvider>
      <App />
    </VideoProvider>
  </Router>
);