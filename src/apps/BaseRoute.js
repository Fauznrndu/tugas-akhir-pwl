import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../modules/Dashboard';
import Signup from '../modules/Signup';

const BaseRoute = () => {
  return (
    <div>
      <React.Suspense>
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default BaseRoute;
