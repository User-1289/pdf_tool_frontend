import React, { useState } from 'react';
import Image from 'next/image';
import LogOutImg from '../assets/logout.png'
import { getProjects, saveAllProjectsLocally } from '../lib/getUserProjects';

function AccountOptions() {
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);

  const signOutUser = () => {
    // Implement your logout logic here
    console.log('User signed out');
  };

  const confirmLogout = () => {
    setIsLogoutConfirmationOpen(true);
  };

  const handleLogout = () => {
    signOutUser();
    setIsLogoutConfirmationOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmationOpen(false);
  };

  return (
    <div className="absolute top-5 right-10 z-10 bg-white shadow-md rounded-lg p-5">
      <button
        className="flex items-start	justify-start mb-2 hover:bg-gray-100 rounded-md p-2"
        onClick={confirmLogout}
      >
        Log Out
      </button>
      {isLogoutConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Confirmation</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
                onClick={handleLogout}
              >
                OK
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountOptions;