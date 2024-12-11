const Task = require('../models/Task')

const getTasks = (req,res)=>{
    res.send('All tasks')
}

const getSingleTask = (req,res)=>{
    res.send('Get single task')
}

const createTask= async (req,res)=>{
    const task= await Task.create(req.body)
    res.status(201).json({task})
}

const updateTask = (req,res)=>{
    res.send('update task')
}

const deleteTask= (req,res)=>{
    res.send('delete task')
}

module.exports = {
    getTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask}