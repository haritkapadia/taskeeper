import express from 'express'
import Task from '../models/TaskSchema.js'

const router = express.Router()

//Get all Tasks
router.get('/', async (req, res) => {
    const query = req.query.category ? (await Task.find({ category: req.query.category })) : (await Task.find())
    res.json(query)
})

//Get Task by ID
router.get('/:id', async (req, res) => {
    try {
        const query = await Task.findById({ _id: req.params.id })
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Task doesn't exist" })
    }
})

//Post new task
router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        category: req.body.category,
        parent: req.body.parent
    })
    await task.save()
    res.json(task)
})

//Post new subtask
router.post('/:id', async (req, res) => {
    try {
        const parent = await Task.findById({ _id: req.params.id })
        const task = new Task({
            name: req.body.name,
            category: parent.category,
            parent: parent._id
        })
        await task.save()
        await Task.updateOne({ _id: req.params.id }, { $push: { children: [task._id] } })
        res.json(task)
    } catch (err) {
        res.status(404)
        res.send({ error: "Task doesn't exist" })
    }
})

//Update task
router.patch("/:id", async (req, res) => {
    try {
        const query = await Task.updateOne({ _id: req.params.id }, req.body)
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Could not update task" })
    }
})

export default router