import StatCard from "./statcard";
import TaskCard from "./taskcard";
import { useState } from "react";
import AddTask from "./addtask";
import { createTask, nextTaskStatus, formatTimeSpent } from "./taskHelpers";

function Dashboard() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "learn react", description: "understanding components", status: "pending", timeSpent: 50 },
        { id: 2, title: "learn SQL", description: "understanding queries", status: "completed", timeSpent: 40 },
        { id: 3, title: "learn DSA", description: "understanding", status: "completed", timeSpent: 90 }
    ]);

    const totalTimeSpent = tasks.reduce((sum, task) => sum + Number(task.timeSpent || 0), 0);

    function toggleTask(id) {
        const updateTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: nextTaskStatus(task.status)
                };
            }
            return task;
        });

        setTasks(updateTasks);
    }

    function handleAddTask(title, description) {
        const newTask = createTask(title, description);
        setTasks((currentTasks) => [newTask, ...currentTasks]);
    }

    return (
        <main>
            <div className="stats-container">
                <StatCard title={"total tasks"} value={tasks.length} />
                <StatCard title={"completed"} value={tasks.filter((task) => task.status === "completed").length} />
                <StatCard title={"pending"} value={tasks.filter((task) => task.status === "pending").length} />
                <StatCard title={"time spending"} value={formatTimeSpent(totalTimeSpent)} />
            </div>
            <AddTask onAdd={handleAddTask} />
            <h2>Recent Tasks</h2>
            <div className="task-container">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() => toggleTask(task.id)}
                    />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;