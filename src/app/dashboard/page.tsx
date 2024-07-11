"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="flex gap-3">
      <div className="dashboard w-1/3">
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  Admin
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      {/* Navbar */}
      <div className="navbar w-2/3 ">
        <div className="bg-gray-800 h-14 p-3">
          <div className="flex items-center h-full justify-between text-white font-extrabold">
            <h1>Edit Profile</h1>
            <h1>Welcome {username}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;