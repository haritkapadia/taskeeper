import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import Task from '../models/Task.js'

const auth = (req, query) => query.where('user').equals(req.tasks.user)

const router = express.Router()

router.use((req, res, next) => {
    if (req.session && req.session.passport) {
        const user = req.session.passport.user
        req.tasks = { user }
        next()
    } else {
        res.status(401).json({ errors: 'Not logged in' })
    }
})

//Get all Tasks
router.get('/', async (req, res) => {
    try {
        const query = req.query.category ? (
            await auth(req, Task.find({ category: req.query.category }))
        ) : (
            await auth(req, Task.find())
        )
        res.json(query)
    } catch (err) {
        res.status(404).json({ errors: 'No tasks found' })
    }
})

//Get Task by ID
router.get('/:id', async (req, res) => {
    try {
        const query = await auth(req, Task.findById({ _id: req.params.id }))
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Task doesn't exist" })
    }
})

//Post new task
router.post('/', async (req, res) => {
    try {
        const task = new Task({
            user: req.tasks.user,
            ...req.body
        })
        await task.save()
        res.json(task)
    } catch (err) {
        res.status(404).json({ errors: err })
    }
})

//Post new subtask
router.post('/:id', async (req, res) => {
    try {
        const parent = await auth(req, Task.findById({ _id: req.params.id }))
        const task = new Task({
            user: req.tasks.user,
            name: req.body.name,
            category: parent.category,
            parent: parent._id
        })
        await task.save()
        await auth(req, Task.updateOne(
            { _id: req.params.id },
            { $push: { children: [task._id] } }
        ))
        res.json(task)
    } catch (err) {
        res.status(404)
        res.send({ error: "Parent doesn't exist" })
    }
})

const updateChild = async (id) => {
    try {
        const query = await Task.updateOne({ _id: id }, { status: true })
        const task = await Task.findById({ _id: id })
        updateChildren(task.toObject())
    } catch (err) {
        console.log("Error updating child task")
    }
}

const updateChildren = (task) => {
    const children = task.children
    const len = children.length
    if (!len) {
        return
    } else {
        for (let i = 0; i < len; i++) {
            updateChild(children[i])
        }
    }
}

//Update task
router.patch("/:id", async (req, res) => {
    try {
        const query = await auth(req, Task.updateOne({ _id: req.params.id }, req.body))
        if (req.body.status) {
            const task = await auth(req, Task.findById({ _id: req.params.id }))
            updateChildren(task.toObject())
        }
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Could not update task" })
    }
})

//Delete task by ID
router.delete("/:id", async (req, res) => {
    try {
        const query = await auth(req, Task.deleteOne({ _id: req.params.id }))
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Could not delete task" })
    }
})

export default router
