import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postsRoute from './routes/posts.js'

dotenv.config()
const PORT = process.env.PORT || 8000
const app = express()

app.use('/tasks', postsRoute);
app.get('/test', (_req, res, _err) => res.json({ response: 'Hello World!' }))

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Connected to db")
    })
    /*
    const connection = mongoose.connection
    const collection = await connection.db('PersonalManagement').collection('Tasks')
    const query = await collection.find({ status: false })
    console.log(await query.toArray())
    await db.close()*/
})