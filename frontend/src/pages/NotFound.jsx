import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-6xl mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="text-7xl font-black text-gray-100 mb-4">404</div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
    <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-primary">← Back to Home</Link>
  </div>
);

export default NotFound;
