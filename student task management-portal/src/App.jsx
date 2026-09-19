import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Dashboard from "./components/dashboard.jsx";
import TaskDetails from "./components/task details.jsx";
import { createTask, nextTaskStatus, deleteTask } from "./components/taskHelpers.js";

function getTaskId(task) {
  return task.id ?? task._id;
}

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load tasks: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setTasks(data);
      })
      .catch((error) => console.error("Error loading tasks:", error));

    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleTask(id) {
    const task = tasks.find((currentTask) => getTaskId(currentTask) === id);
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
          getTaskId(currentTask) === id ? { ...currentTask, ...updatedTask } : currentTask
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

      setTasks((currentTasks) => deleteTask(currentTasks, id, getTaskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function handleAddTask(title, description) {
    const newTask = createTask(title, description);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Task creation failed: ${response.status}`);
      }

      const savedTask = await response.json();
      setTasks((currentTasks) => [savedTask, ...currentTasks]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
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