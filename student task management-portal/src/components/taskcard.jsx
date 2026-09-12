import { Link } from "react-router-dom";

function TaskCard(props) {
    return(
        <div className="task-card">
            <div className="task-card-content">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                <p className="task-status"> {props.status}</p>
            </div>
            <div className="task-card-actions">
                <button className="task-toggle-button" onClick={props.onToggle}>Change Status</button>
                <Link className="task-details-link" to={`/tasks/${props.id}`}>View Details</Link>
                <button className="task-delete-button" onClick={props.onDelete} aria-label="Delete task">
                    <span className="delete-icon" title="Delete task">×</span>
                </button>
            </div>
        </div>
    );
}
export default TaskCard;