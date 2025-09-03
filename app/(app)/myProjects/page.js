"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(savedProjects);
  }, []);

  // Save to localStorage when projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  const [newMembers, setNewMembers] = useState({});

  // Modal states
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
    team: [],
  });
  const [newMemberInput, setNewMemberInput] = useState("");

  // Delete project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  // Open update modal
  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setFormData({ name: project.name, description: project.description });
  };

  // Save update
  const handleSaveUpdate = () => {
    setProjects(
      projects.map((p) =>
        p.id === editingProject.id ? { ...p, ...formData } : p
      )
    );
    setEditingProject(null);
  };

  // Add project modal save
  const handleSaveNewProject = () => {
    if (!newProjectData.name.trim() || !newProjectData.description.trim()) return;

    const newProject = {
      id: projects.length + 1,
      name: newProjectData.name,
      description: newProjectData.description,
      team: newProjectData.team,
    };

    setProjects([...projects, newProject]);
    setNewProjectData({ name: "", description: "", team: [] });
    setNewMemberInput("");
    setIsAddModalOpen(false);
  };

  // Add member while creating new project
  const handleAddMemberToNew = () => {
    if (!newMemberInput.trim()) return;
    setNewProjectData({
      ...newProjectData,
      team: [...newProjectData.team, newMemberInput.trim()],
    });
    setNewMemberInput("");
  };

  // Remove member while creating new project
  const handleRemoveMemberFromNew = (member) => {
    setNewProjectData({
      ...newProjectData,
      team: newProjectData.team.filter((m) => m !== member),
    });
  };

  // Add member to existing project
  const handleAddMember = (projectId) => {
    const memberName = newMembers[projectId]?.trim();
    if (!memberName) return;

    setProjects(
      projects.map((p) =>
        p.id === projectId ? { ...p, team: [...p.team, memberName] } : p
      )
    );
    setNewMembers({ ...newMembers, [projectId]: "" });
  };

  // Remove member from existing project
  const handleRemoveMember = (projectId, memberName) => {
    setProjects(
      projects.map((p) =>
        p.id === projectId
          ? { ...p, team: p.team.filter((m) => m !== memberName) }
          : p
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-black">Projects</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          >
            + Add Project
          </button>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition relative"
            >
              <h3 className="text-xl font-bold mb-2 text-black">
                {project.name}
              </h3>
              <p className="text-gray-600 mb-3">{project.description}</p>

              {/* Team members */}
              <div className="mb-3">
                <h4 className="font-medium text-black">Team Members:</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {project.team.map((member, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{member}</span>
                      <button
                        onClick={() => handleRemoveMember(project.id, member)}
                        className="text-red-500 text-xs hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Add Member */}
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="New member"
                    className="flex-1 border px-2 py-1 rounded text-black text-sm"
                    value={newMembers[project.id] || ""}
                    onChange={(e) =>
                      setNewMembers({
                        ...newMembers,
                        [project.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddMember(project.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddMember(project.id)}
                    className="ml-2 px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleOpenEditModal(project)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Update Modal */}
      {editingProject && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/30"
            onClick={() => setEditingProject(null)}
          ></div>

          <div className="relative bg-white rounded-lg w-96 p-6 shadow-lg z-10 mt-20">
            <h2 className="text-xl font-bold mb-4 text-black text-center">
              Update Project
            </h2>

            <div className="mb-3">
              <label className="block mb-1 text-black">Project Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-black">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 rounded border text-black"
                onClick={() => setEditingProject(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSaveUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/30"
            onClick={() => setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-lg w-96 p-6 shadow-lg z-10 mt-20">
            <h2 className="text-xl font-bold mb-4 text-black text-center">
              Add Project
            </h2>

            <div className="mb-3">
              <label className="block mb-1 text-black">Project Name</label>
              <input
                type="text"
                value={newProjectData.name}
                onChange={(e) =>
                  setNewProjectData({ ...newProjectData, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-black">Description</label>
              <textarea
                value={newProjectData.description}
                onChange={(e) =>
                  setNewProjectData({
                    ...newProjectData,
                    description: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>

            {/* Add members */}
            <div className="mb-3">
              <label className="block mb-1 text-black">Team Members</label>
              <div className="flex">
                <input
                  type="text"
                  value={newMemberInput}
                  onChange={(e) => setNewMemberInput(e.target.value)}
                  placeholder="Enter member"
                  className="flex-1 border px-2 py-1 rounded text-black"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddMemberToNew();
                  }}
                />
                <button
                  onClick={handleAddMemberToNew}
                  className="ml-2 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>

              {/* Show added members */}
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                {newProjectData.team.map((m, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{m}</span>
                    <button
                      onClick={() => handleRemoveMemberFromNew(m)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 rounded border text-black"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSaveNewProject}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
