"use client";

import { useEffect, useState } from "react";
import TaskModal from "../../components/TaskModal";

export default function MyTaskView() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save task (add new or update existing)
  const handleSave = (task) => {
    let updatedTasks = [...tasks];

    if (currentTask) {
      // Update existing task
      updatedTasks = updatedTasks.map((t) =>
        t.id === currentTask.id ? { ...t, ...task } : t
      );
    } else {
      // Add new task
      const newTask = { id: Date.now(), ...task };
      updatedTasks.push(newTask);
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  // Delete task
  const handleDelete = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filtered));
    setTasks(filtered);
  };

  // Edit task
  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      {/* <h1 className="text-2xl font-bold mb-6 text-black">My Tasks</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-6"
      >
        + Add Task
      </button> */}

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-semibold text-black">My Tasks</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col"
            >
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Title / Summary:
                  </p>
                  <h2 className="text-lg font-semibold text-black">
                    {task.title}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Description:
                  </p>
                  <p className="text-gray-700">{task.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Status:</p>
                  <p className="text-gray-700">{task.status}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Priority:</p>
                  <p className="text-gray-700">{task.priority}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentTask(null);
          }}
          onSave={handleSave}
          existingTask={currentTask}
        />
      )}
    </div>
  );
}
