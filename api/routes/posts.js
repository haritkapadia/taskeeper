import express from 'express'
import mongoose from 'mongoose'
import Post from '../models/Post.js'

const router = express.Router()


router.get('/', async (req, res) => {
    const query = await Post.find({ status: false })
    console.log(query)
    res.json(query)
})

/*router.post('/', (req,res) +> {
    const post = 
})*/

export default router