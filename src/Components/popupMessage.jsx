import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PopupMessage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true); // Show popup on mount
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md p-8 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-gradient-to-br from-gray-100 to-white border-4 border-blue-500/30">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to <span className="text-blue-600">Monopoly X</span></h1>
        <p className="text-gray-600 mb-6 text-lg">
          Step into the ultimate web-based Monopoly experience! Choose how you'd like to begin.
        </p>

        <div className="flex flex-col gap-4">
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition duration-200"
            onClick={() => {
              setShow(false);
              navigate("/Lobby");
              // Add guest login logic here
            }}
          >
            Play as Guest
          </button>
          <button
            className="bg-gradient-to-r from-gray-300 to-gray-200 text-gray-800 py-2 px-4 rounded-xl font-semibold shadow hover:from-gray-400 hover:to-gray-300 transition duration-200"
            onClick={() => {
              setShow(false);
              navigate("/Lobby");
              // Add login logic here
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
