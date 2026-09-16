// bring express in node.js
const express=require('express');
const cors=require('cors');

// create express app using what we imported
const app=express();
// install cors middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());
const initialTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is the description for Task 1",
    status: "pending",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the description for Task 2",
    status: "completed",
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the description for Task 3",
    status: "pending",
  },
];
app.get("/api/tasks", (req, res) => {
  res.json(initialTasks);
});
app.get("/api/tasks/:id",(req,res)=>{
  const id=Number(req.params.id);
  const task = initialTasks.find((initialTasks)=>initialTasks.id===id);
  if(!task){
    return res.status(404).json({error:"task noot found"})
  }
  res.json(task);
});
app.put("/api/tasks/:id",(req,res)=>{
  const id=Number(req.params.id);
  const task = initialTasks.find((task) => task.id === id);
  if(!task){
    return res.status(404).json({error:"task not found"});
  }

  if (!['pending', 'completed'].includes(req.body.status)) {
    return res.status(400).json({error:"invalid task status"});
  }

  task.status=req.body.status;
  res.json(task);
});
app.delete("/api/tasks/:id",(req,res)=>{
    const id=Number(req.params.id);
    const taskIndex=initialTasks.findIndex((task)=>task.id===id);
    if(taskIndex===-1){
      return res.status(404).json({error:"task not found"});
    }
    const [deletedTask]=initialTasks.splice(taskIndex,1);
    res.json({message:"task deleted successfully", task: deletedTask});
});
app.post("/api/tasks",(req,res)=>{
  const newTask=req.body;
  initialTasks.push(newTask);
  res.status(201).json(newTask);
});

//API Route(testing backend connection)
app.get("/", (req, res) => {
  res.send("backend is working");
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});