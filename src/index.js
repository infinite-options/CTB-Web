import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DisplayProductsComponent from './DisplayProductsComponent';
import TempProducts from './TempProducts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPart from './Components/AddPart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/add' element={<AddPart/>}/>
      
  
    </Routes>
  </Router>
    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
