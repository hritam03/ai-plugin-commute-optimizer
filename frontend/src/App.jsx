import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import BrowsePGs from './pages/BrowsePGs';
import AddPG from './pages/AddPG';
import Recommendations from './pages/Recommendations';
import PGDetails from './pages/PGDetails';
import NotFound from './pages/NotFound';
import { useContext } from 'react';
import { AppContext } from './context/AppContext.jsx';

function App() {
  const { toast } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {toast && <Toast message={toast.message} type={toast.type} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowsePGs />} />
          <Route path="/add-pg" element={<AddPG />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/pg/:id" element={<PGDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
