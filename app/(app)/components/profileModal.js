"use client";

import { useState } from "react";

export default function ProfileModal({ user, setUser, closeModal }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setMessage("");

    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully!");
        setUser(data.user); // update context
        setFormData({ ...formData, password: "" });
        closeModal();
      } else {
        setMessage(data.error || "Failed to update profile.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-white/30"
        onClick={closeModal} // optional: click outside to close
      ></div>

      {/* Modal box */}
      <div className="relative bg-white rounded-lg w-96 p-6 shadow-lg z-10">
        <h2 className="text-xl font-bold mb-4 text-black text-center">Update Profile</h2>

        {/* Username */}
        <div className="mb-3">
          <label className="block mb-1 text-black">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-1 text-black">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block mb-1 text-black">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border px-3 py-2 rounded text-black"
          />
        </div>

        {message && <p className="text-red-500 mb-2">{message}</p>}

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="px-4 py-2 rounded border text-black"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
