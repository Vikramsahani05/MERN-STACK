import StatCard from "./statcard";
import TaskCard from "./taskcard";
import AddTask from "./addtask";
import { formatTimeSpent } from "./taskHelpers";

function Dashboard({ tasks = [], onAdd = () => {}, onToggle = () => {}, onDelete = () => {} }) {
    const totalTimeSpent = tasks.reduce((sum, task) => sum + Number(task.timeSpent || 0), 0);
    return (
        <main>
            <div className="stats-container">
                <StatCard title={"total tasks"} value={tasks.length} />
                <StatCard title={"completed"} value={tasks.filter((task) => task.status === "completed").length} />
                <StatCard title={"pending"} value={tasks.filter((task) => task.status === "pending").length} />
                <StatCard title={"time spending"} value={formatTimeSpent(totalTimeSpent)} />
            </div>
            <AddTask onAdd={onAdd} />
            <h2>Recent Tasks</h2>
            <div className="task-container">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() => onToggle(task.id)}
                        onDelete={() => onDelete(task.id)}
                    />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;