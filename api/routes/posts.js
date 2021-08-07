import express from 'express'
import mongoose from 'mongoose'
import Task from '../models/TaskSchema.js'

const router = express.Router()


router.get('/', async (req, res) => {
    const query = await Task.find({ status: false })
    console.log(query)
    res.json(query)
})

/*router.post('/', (req,res) +> {
    const post = 
})*/

export default router