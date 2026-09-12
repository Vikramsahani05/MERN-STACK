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

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, status: nextTaskStatus(task.status) } : task
      )
    );
  }

  function removeTask(id) {
    setTasks((currentTasks) => deleteTask(currentTasks, id));
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