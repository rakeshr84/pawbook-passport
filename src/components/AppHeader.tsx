import React from "react";

export default function AppHeader({
  showDashboard,
  onDashboard,
}: { showDashboard: boolean; onDashboard: () => void }) {
  return (
    <div className="w-full sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-light text-gray-900">🐾 PawBuck</div>
        {showDashboard && (
          <button
            onClick={onDashboard}
            className="px-5 py-2 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-300"
          >
            My Pets
          </button>
        )}
      </div>
    </div>
  );
}
