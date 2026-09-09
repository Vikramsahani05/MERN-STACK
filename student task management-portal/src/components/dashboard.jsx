import StatCard from "./statcard.jsx";
import TaskCard from "./taskcard.jsx";

function Dashboard() {
    const tasks = [
        { title: "learn react", description: "understanding react", status: "pending" },
        { title: "learn redux", description: "understanding redux", status: "completed" },
        { title: "learn node", description: "understanding node", status: "in-progress" }
    ];

    return (
        <main>
            <div className="stats-container">
                <StatCard title="Total Tasks" value="10" />
                <StatCard title="Completed" value="7" />
                <StatCard title="Pending" value="3" />
                <StatCard title="Time Spent" value="1 hour" />
            </div>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {tasks.map((task, index) => (
                    <TaskCard key={index} title={task.title} description={task.description} status={task.status} />
                ))}
            </div>
        </main>
    );
}

export default Dashboard;