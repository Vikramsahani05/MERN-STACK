import StatCard from "./statcard.jsx";
import TaskCard from "./taskcard.jsx";
import AddTask from "./addtask.jsx";

function Dashboard(props) {

    return (
        <main>
            <div className="stats-container">
                <StatCard title="Total Tasks" value={props.tasks.length}/>
                <StatCard title="Completed"
                 value={props.tasks.filter((task)=>task.status?.toLowerCase() === "completed").length}/>
                <StatCard title="Pending" 
                value={props.tasks.filter((task)=>task.status?.toLowerCase() !== "completed").length}/>
                
            </div>

            <AddTask onAdd={props.onAdd}/>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {props.tasks.map((task)=>(
                    <TaskCard 
                        key={task.id ?? task._id}
                        id={task.id ?? task._id}
                        title={task.title} 
                        description={task.description} 
                        status={task.status}
                        onToggle={() => props.onToggle(task.id ?? task._id)}
                        onDelete={() => props.onDelete(task.id ?? task._id)}
                    />
                ))}
            </div>

        </main>
    );
}

export default Dashboard;