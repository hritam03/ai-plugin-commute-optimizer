import React from 'react';
import { Link } from 'react-router-dom';
import { HiSearch, HiPlus, HiSparkles } from 'react-icons/hi';
import { MdApartment, MdLocationCity } from 'react-icons/md';

const StatCard = ({ icon, value, label }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 flex items-center gap-4">
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl text-gray-700">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
);

const ActionCard = ({ to, icon, title, description, cta }) => (
  <Link to={to} className="card hover:scale-[1.02] flex flex-col gap-3 group block">
    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-gray-900 text-base mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
    <span className="mt-auto text-sm font-medium text-black group-hover:underline">{cta} →</span>
  </Link>
);

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero */}
      <div className="text-center py-12 mb-8">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full mb-4 font-medium">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
          Bangalore PG Finder
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Find Your Perfect<br />
          <span className="text-gray-400">PG in Bangalore</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
          Smart recommendations based on your office location, lifestyle preferences, and budget.
        </p>
        <div className="flex justify-center gap-3 mt-8">
          <Link to="/recommendations" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            <HiSparkles /> Get Recommendations
          </Link>
          <Link to="/browse" className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5">
            <HiSearch /> Browse PGs
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={<MdApartment />} value="100+" label="PG Listings" />
        <StatCard icon={<MdLocationCity />} value="3" label="Office Zones" />
        <StatCard icon={<HiSparkles />} value="AI" label="Powered Matching" />
        <StatCard icon="🏆" value="5" label="Smart Labels" />
      </div>

      {/* Action Cards */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Get Started</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ActionCard
          to="/browse"
          icon={<HiSearch />}
          title="Browse All PGs"
          description="Explore our full catalogue of PG listings with filters by area, rent, and room type."
          cta="Start browsing"
        />
        <ActionCard
          to="/add-pg"
          icon={<HiPlus />}
          title="Add a New PG"
          description="List a new paying guest accommodation and make it discoverable to tenants."
          cta="Add listing"
        />
        <ActionCard
          to="/recommendations"
          icon={<HiSparkles />}
          title="Smart Recommendations"
          description="Get personalized PG suggestions scored by commute, budget, and lifestyle fit."
          cta="Get recommendations"
        />
      </div>

      {/* Office Zones */}
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Supported Office Zones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['Ecospace', 'Manyata Tech Park', 'Bagmane Tech Park'].map((zone) => (
            <div key={zone} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
              <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">{zone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
