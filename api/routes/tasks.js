import express from 'express'
import mongoose from 'mongoose'
import Task from '../models/TaskSchema.js'

const router = express.Router()

//Get all Tasks
router.get('/', async (req, res) => {
    console.log(req.query.category)
    console.log(!req.query.category)
    try {
        const query = req.query.category ? (await Task.find({ category: req.query.category })) : (await Task.find({}))
        res.json(query)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get Task by ID
router.get('/:id', async (req, res) => {
    try {
        const query = await Task.findById({ _id: req.params.id })
        res.json(query)
    } catch (err) {
        res.json({ message: err })
    }
})


//Post new task
router.post('/', async (req, res) => {
    console.log(req.body)
    const task = new Task({
        name: req.body.name,
        status: req.body.status,
        category: req.body.category
    })
    await task.save()
    res.json(task)
})

export default router