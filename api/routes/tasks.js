import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import Task from '../models/Task.js'

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
            await Task.find({ user: req.tasks.user, category: req.query.category })
        ) : (
            await Task.find({ user: req.user })
        )
        res.json(query)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get Task by ID
router.get('/:id', async (req, res) => {
    try {
        const query = await Task.findOne({ user: req.tasks.user, _id: req.params.id })
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Task doesn't exist" })
    }
})

//Post new task
router.post('/', async (req, res) => {
    const task = new Task({
        user: req.tasks.user,
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
        res.send({ error: "Parent doesn't exist" })
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

//Delete task by ID
router.delete("/:id", async (req, res) => {
    try {
        const query = await Task.deleteOne({ _id: req.params.id })
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Could not delete task" })
    }
})

export default router
