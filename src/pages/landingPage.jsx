import { nav } from "framer-motion/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const gameOptions = [
    {
      id: 1,
      title: "🧑‍🤝‍🧑 Play Local",
      description: "Play with friends on the same device",
      color: "from-green-400 to-green-600",
      hoverColor: "from-green-500 to-green-700"
    },
    {
      id: 2,
      title: "🌐 Play Online",
      description: "Challenge players worldwide",
      color: "from-blue-400 to-blue-600",
      hoverColor: "from-blue-500 to-blue-700"
    },
    {
      id: 3,
      title: "🤖 VS Computer",
      description: "Practice against AI opponents",
      color: "from-purple-400 to-purple-600",
      hoverColor: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-5 bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-2">
          <div className="text-3xl font-bold text-indigo-700">🎲</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Monopoly X
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-gray-800 font-medium">Player123</span>
            <span className="text-xs text-gray-500">Online</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white shadow-md flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Welcome to <span className="text-indigo-600">Monopoly X</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The modern twist on the classic board game. Buy, trade, and strategize your way to victory!
          </p>
        </div>

        {/* Game Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {gameOptions.map((option) => (
            <div
              key={option.id}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={()=> {navigate("/local/Ingame")}} // Add your navigation logic here
              className={`bg-gradient-to-br ${hoveredCard === option.id ? option.hoverColor : option.color} rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="p-6 h-48 flex flex-col justify-center items-center text-center">
                <div className="text-4xl mb-4">{option.title.split(' ')[0]}</div>
                <h2 className="text-xl font-bold text-white mb-2">{option.title}</h2>
                <p className="text-white/90 text-sm">{option.description}</p>
              </div>
              <div className="bg-white/20 h-1 w-full" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          <p className="mt-2">v2.4.1 © 2023 Monopoly X</p>
        </div>
      </div>
    </div>
  );
}
