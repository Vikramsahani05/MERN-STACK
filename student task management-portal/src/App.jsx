import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Dashboard from "./components/dashboard.jsx";
import TaskDetails from "./components/task details.jsx";
import { createTask, nextTaskStatus, deleteTask } from "./components/taskHelpers.js";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "learn react", description: "understanding components", status: "pending", timeSpent: 50 },
    { id: 2, title: "learn SQL", description: "understanding queries", status: "completed", timeSpent: 40 },
    { id: 3, title: "learn DSA", description: "understanding", status: "completed", timeSpent: 90 }
  ]);

  async function toggleTask(id) {
    const task = tasks.find((currentTask) => currentTask.id === id);
    if (!task) return;

    const status = nextTaskStatus(task.status);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Task update failed: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === id ? { ...currentTask, ...updatedTask } : currentTask
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function removeTask(id) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Task deletion failed: ${response.status}`);
      }

      setTasks((currentTasks) => deleteTask(currentTasks, id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function handleAddTask(title, description) {
    const newTask = createTask(title, description);
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} onAdd={handleAddTask} onToggle={toggleTask} onDelete={removeTask} />} />
        <Route path="/dashboard" element={<Dashboard tasks={tasks} onAdd={handleAddTask} onToggle={toggleTask} onDelete={removeTask} />} />
        <Route path="/tasks" element={<Dashboard tasks={tasks} onAdd={handleAddTask} onToggle={toggleTask} onDelete={removeTask} />} />
        <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;