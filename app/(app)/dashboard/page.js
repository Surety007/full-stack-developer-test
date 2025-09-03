"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskModal from "../components/TaskModal";
import { useAuth } from "@/app/context/AuthContext"; // import auth context

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const { user, loading } = useAuth(); // get user from context
  const [projects, setProjects] = useState([]);  // ✅ add projects state


  // Load tasks from localStorage to show count
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || []; 
    setProjects(savedProjects)// ✅ load projects
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null; // will redirect

  // Handle task submission from modal
  const handleTaskSubmit = (task) => {
    const updatedTasks = [...tasks, { id: Date.now(), ...task }];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setIsModalOpen(false);
    router.push("/dashboard/myTaskView"); // redirect after saving
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-black">
            Welcome, to your Dashboard
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        {/* Dashboard tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Tasks Tile */}
          <div
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer relative"
            onClick={() => router.push("/dashboard/myTaskView")}
          >
            <h3 className="text-xl font-bold mb-2 text-black">My Tasks</h3>
            <p className="text-gray-600">View and manage all your tasks.</p>

            {/* Task count badge */}
            <div className="absolute top-5 right-3 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
              {tasks.length}
            </div>
          </div>

          {/* Projects Tile */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer relative" 
          onClick={() => router.push("/myProjects")}>

            <h3 className="text-xl font-bold mb-2 text-black">My Projects</h3>
            <p className="text-gray-600">Track your ongoing projects.</p>

            <div className="absolute top-3 right-3 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
            {projects.length}
            </div>
          </div>

          {/* Teams Tile */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-black cursor-pointer">
              Teams
            </h3>
            <p className="text-gray-600">Collaborate with your teammates.</p>
          </div>
        </div>
      </main>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleTaskSubmit}
        />
      )}
    </div>
  );
}
