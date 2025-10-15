import React, { useState } from "react";

export default function EditProfile({
  user,
  onSave,
  onCancel,
}: {
  user: { full_name?: string; email?: string; phone?: string } | null;
  onSave: (u: { full_name?: string; phone?: string }) => void;
  onCancel: () => void;
}) {
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const canSave = fullName.trim().length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
        <h1 className="text-4xl font-light text-gray-900 mb-6">Edit Profile</h1>
        <div className="space-y-6">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-6 py-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">Email (read-only)</span>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-6 py-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 font-light cursor-not-allowed"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-6 py-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              placeholder="+1 555 000 0000"
            />
          </label>

          <div className="flex gap-4 pt-6">
            <button onClick={onCancel} className="px-8 py-4 text-gray-600 hover:text-gray-900 font-light transition-all">Cancel</button>
            <button
              onClick={() => onSave({ full_name: fullName, phone })}
              disabled={!canSave}
              className="ml-auto bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-all duration-300"
            >
              Save ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
