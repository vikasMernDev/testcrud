import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const handlePerfEntry = (entry: any) => {
  // Handle the performance entry as needed
  console.log(entry);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Pass the callback function to reportWebVitals
reportWebVitals(handlePerfEntry);
