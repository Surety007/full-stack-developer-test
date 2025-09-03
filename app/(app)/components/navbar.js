"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CgProfile } from "react-icons/cg";
import ProfileModal from "./profileModal";
import Link from "next/link";

export default function Navbar() {
  const { user, setUser, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    setDropdownOpen(false);
  };
  console.log(user);

  return (
    <>
      <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md relative">
        <div className="text-2xl font-bold">TaskManager</div>

        <div className="hidden md:flex items-center space-x-6 font-medium">
          {!user ? (
            <>
              <button onClick={() => router.push("/login")}>Login</button>
              <button onClick={() => router.push("/register")}>Register</button>
            </>
          ) : (
            <div
              className="flex space-x-10 space-y-3 font-medium"
              ref={dropdownRef}
            >
              {/* Profile Icon */}
              <Link href="/dashboard" className="hover:text-gray-200">
                Dashboard
              </Link>
              <CgProfile
                className="w-8 h-8 text-white rounded-full bg-blue-500 p-1 cursor-pointer"
                title={user.name}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute mt-10 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setModalOpen(true); // open modal on My Profile
                      setDropdownOpen(false);
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      router.push("/settings");
                      setDropdownOpen(false);
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Profile Modal */}
      {modalOpen && user && (
        <ProfileModal
          user={user}
          setUser={setUser}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
