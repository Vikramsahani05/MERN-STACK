import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TaskDetails({ tasks }) {
    const { id } = useParams();
    const existingTask = tasks.find((currentTask) => currentTask.id === Number(id));
    const [fetchedTask, setFetchedTask] = useState(null);
    const [loading, setLoading] = useState(!existingTask);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (existingTask) {
            return;
        }

        fetch(`/api/tasks/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Task request failed: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setFetchedTask(data))
            .catch((fetchError) => {
                console.error("Error fetching task:", fetchError);
                setError("Unable to load task details.");
            })
            .finally(() => setLoading(false));
    }, [id, existingTask]);

            const matchingFetchedTask = fetchedTask?.id === Number(id) ? fetchedTask : null;
            const task = existingTask || matchingFetchedTask;

    if (loading) {
        return <p>Loading task details...</p>;
    }

    if (error && !existingTask) {
        return <p>{error}</p>;
    }

    if (!task) {
        return <p>Task not found.</p>;
    }

    return (
        <main className="dashboard-page">
            <h1>Task Details</h1>
            <div className={`task-card ${task.status === "completed" ? "completed" : "pending"}`}>
                <div className="task-content">
                    <div className="task-header-row">
                        <h3>{task.title}</h3>
                        <span className="status-badge">{task.status}</span>
                    </div>
                    <p>{task.description}</p>
                </div>
            </div>
        </main>
    );
}

export default TaskDetails;