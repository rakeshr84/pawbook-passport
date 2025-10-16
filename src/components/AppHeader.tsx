import React from "react";

export default function AppHeader({
  showDashboard,
  onDashboard,
}: { showDashboard: boolean; onDashboard: () => void }) {
  return (
    <div className="w-full sticky top-0 z-40 glass-effect border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-light text-foreground">🐾 PawBuck</div>
        {showDashboard && (
          <button
            onClick={onDashboard}
            className="px-5 py-2 rounded-3xl gradient-accent text-white font-light hover:shadow-lg hover:shadow-accent/30 ios-transition button-glow-tap"
          >
            My Pets
          </button>
        )}
      </div>
    </div>
  );
}
