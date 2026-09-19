import { Link } from "react-router-dom";

function TaskCard(props) {
    const status = props.status?.toLowerCase() || "pending";

    return (
        <div className="task-card">
            <h3>{props.title}</h3>
            <p>{props.description || "No description added."}</p>
            <p className={`task-status status-${status}`}>{status}</p>
            <button type="button" onClick={props.onToggle}>
                {status === "completed" ? "Reopen task" : "Mark complete"}
            </button>
            <button type="button" onClick={props.onDelete}>
                Delete
            </button>
            <Link to={`/tasks/${props.id}`}>View Details</Link>
        </div>
    );
}

export default TaskCard;