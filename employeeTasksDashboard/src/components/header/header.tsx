import React from 'react';

const Header: React.FC = () => {
  return (
   
    <div className="flex justify-between  py-6">
      <div>
        <h1 className="text-2xl font-extrabold">Daily employees tasks</h1>
        <p className="text-gray-500">Manage your employees</p>
      </div>
      <div className="space-x-3">
        <button className="px-4 py-2 border rounded-md shadow-lg shadow-black-500/50">Export</button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-lg shadow-indigo-500/50">+ Add Employee</button>
      </div>
    </div>
  );
};

export default Header;
