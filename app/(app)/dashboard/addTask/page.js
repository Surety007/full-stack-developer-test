"use client";

import { useEffect, useState } from "react";

export default function MyTaskView() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">My Tasks</h1>

      {tasks.length === 0 && <p className="text-gray-600">No tasks added yet.</p>}

      <div className="grid grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow flex flex-col">
            <h2 className="text-lg font-semibold text-black">{task.title}</h2>
            <p className="text-gray-700 mt-2">{task.description}</p>
            <p className="text-sm text-gray-500 mt-1">Status: {task.status}</p>
            <p className="text-sm text-gray-500 mt-1">Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
