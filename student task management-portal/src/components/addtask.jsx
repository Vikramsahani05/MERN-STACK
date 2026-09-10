import { useState } from "react";

function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleAdd() {
        const cleanTitle = title.trim();
        const cleanDescription = description.trim();

        if (!cleanTitle) return;

        props.onAdd?.(cleanTitle, cleanDescription);
        setTitle("");
        setDescription("");
    }

    return (
        <div className="add-task-panel">
            <h2>Add Task</h2>
            <div className="add-task-form">
                <input
                    className="add-task-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Task title"
                />
                <textarea
                    className="add-task-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Task description"
                    rows="3"
                />
                <button className="add-task-button" onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
}

export default AddTask;