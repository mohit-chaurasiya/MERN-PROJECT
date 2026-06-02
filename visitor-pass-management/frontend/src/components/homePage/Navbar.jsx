import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">
            Visitor Pass Management
          </h1>

          <div className="space-x-4 text-sm">
            <a href="/login" className="text-white hover:text-gray-300">
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
