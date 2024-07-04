import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import Restauraunt from './pages/Restaurant';
import Guide from './pages/Guide';
import Restaurant from './pages/Restaurant';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Planner from './pages/Planner';
import CompletePlanner from './pages/CompletePlanner';
import i18n from './components/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="Guide" element={<Guide/>} />
        <Route path="Restaurant" element={<Restaurant/>} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp"  element={<SignUp />} />
        <Route path="Planner" element={<Planner/>} />
        <Route path="CompletePlanner" element={<CompletePlanner/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
