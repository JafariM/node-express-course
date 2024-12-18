const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')  //a middleware to not repeat try catch block in every fun
const { createCustomError } = require('../errors/custom-error')

//get all tasks
const getTasks = asyncWrapper (async (req,res)=>{
    const tasks = await Task.find({})
    res.status(201).json({tasks})
})

//get a task
const getSingleTask = asyncWrapper(async(req,res)=>{
   
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id : taskID})
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({task})
   
})

//add a new task
const createTask= asyncWrapper(async (req,res)=>{
    const task= await Task.create(req.body)
    res.status(201).json({task})     
})

//update a task
const updateTask = asyncWrapper(async(req,res)=>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id : taskID},req.body)
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({task})
})

//remove a task
const deleteTask= asyncWrapper(async(req,res)=>{
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id : taskID})
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({task})
   
})

module.exports = {
    getTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask}