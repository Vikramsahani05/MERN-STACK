import { useState } from "react";

function AddTask({ onAdd }){
    const [title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    
    function handleSubmit(e){
        e.preventDefault();
        const cleanTitle = title.trim();
        if (!cleanTitle) return;
        onAdd(cleanTitle, description.trim());
        setTitle("");
        setDescription("");
    }
    
    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Add Title</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Add Description</label>
                <input 
                    type="text" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <br /><br />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}
export default AddTask;