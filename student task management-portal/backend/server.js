require("dotenv").config();

// bring express in Node.js
const express = require("express");

// installing cors middleware
const cors = require("cors");

// create express app using what we imported
const app = express();
const Task = require("./models/task");
const User = require("./user");
const mongoose = require("mongoose");

const localUsers = [];

// use cors middleware to handle requests
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log
    ("MongoDB Connected Successfully!");
}).catch((error)=>{
    console.log
    ("MongoDB Connection Failed: ", error.message);
})

app.get("/api/tasks", async (req, res) =>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Tasks"});
    }
});

app.get("/api/tasks/:id", async (req, res)=>{
    try{
        const task = await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({message:"Task Not Found"})
    }
    res.json(task)
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

app.put("/api/tasks/:id", async (req, res)=>{
    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {status : req.body.status},
            {new : true}
        );
        if(!task){
            return res.status(404).json({message:"Task Not Found"})
        }
        res.json(task);
    }catch{
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

app.delete("/api/tasks/:id", async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            return res.status(404).json({message:"Task Not Found"})
        }
        res.json(deletedTask);
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

app.post("/api/tasks", async (req, res)=>{
    try{
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    }catch(error){
        res.status(500).json({message:"Failed to Fetch Task"})
    }
})

// API Route (Testing Backend)
app.get("/", (req, res) => {
    res.send("Backend is Working!!")
});

app.post("/api/register", async (req, res)=>{
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Please provide a valid email" });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    try {
        if (mongoose.connection.readyState !== 1) {
            if (localUsers.some((user) => user.email === email)) {
                return res.status(409).json({ message: "Email is already registered" });
            }

            const user = { id: Date.now().toString(), name, email };
            localUsers.push({ ...user, password });
            return res.status(201).json({
                message: "User Registered Successfully",
                user
            });
        }

        const newUser = await User.create({ name, email, password });
        return res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email is already registered" });
        }

        console.error("Registration failed:", error.message);
        return res.status(503).json({
            message: "Registration is temporarily unavailable"
        });
    }
})

// start the server and listen to port 5000
app.listen(5000, () => {
    console.log("Server is Running on port 5000");
});