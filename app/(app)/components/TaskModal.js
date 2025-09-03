"use client";

import { useState, useEffect } from "react";

export default function TaskModal({ isOpen, onClose, onSave, existingTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
  });

  // Populate form if editing
  useEffect(() => {
    if (existingTask) {
      setTask(existingTask);
    }
  }, [existingTask]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task); // pass task back to parent
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">
          {existingTask ? "Edit Task" : "➕ Add New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black mb-1">Title / Summary</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Fix login bug"
              className="w-full border px-3 py-2 rounded text-black placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-black mb-1">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Detailed explanation of the task"
              className="w-full border px-3 py-2 rounded text-black placeholder-gray-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-black mb-1">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded text-black"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Done</option>
              <option>Blocked</option>
            </select>
          </div>

          <div>
            <label className="block text-black mb-1">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded text-black"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {existingTask ? "Update Task" : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
