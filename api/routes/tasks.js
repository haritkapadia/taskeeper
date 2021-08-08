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
        res.json({ message: err })
    }
})


//Post new task
router.post('/', async (req, res) => {
    console.log(req.body)
    const task = new Task({
        user: req.tasks.user,
        name: req.body.name,
        status: req.body.status,
        category: req.body.category
    })
    await task.save()
    res.json(task)
})

export default router
