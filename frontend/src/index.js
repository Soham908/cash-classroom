import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SetStateProvider } from './manageRoutes/protectRoutes';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SetStateProvider><App /></SetStateProvider>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
);

