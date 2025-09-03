"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth(); // update user after login

  // Redirect if already logged in
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     router.push("/dashboard");
  //   }
  // }, [router]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });
  
  //     const data = await res.json();
  
  //     if (res.ok) {
  //       // Fetch the logged-in user from /api/auth/me
  //       const meRes = await fetch("/api/auth/me");
  //       const meData = await meRes.json();
  //       setUser(meData.user); // update context

  //       router.push("/dashboard"); // redirect
  //     } else {
  //       setError(data.error || "Invalid credentials");
  //     }
  //   } catch (err) {
  //     setError("Error: " + err.message);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ include cookies in the request
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Fetch user info after login
        const meRes = await fetch("/api/auth/me", { credentials: "include" });
        const meData = await meRes.json();
  
        setUser(meData.user); // ✅ update AuthContext immediately
  
        router.push("/dashboard"); // redirect
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-lg shadow-md w-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Login
        </h2>
        <label className="text-black mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-2 mb-4 rounded text-black placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-black mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 p-2 mb-4 rounded text-black placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      </form>
    </div>
  );
}
