import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import tasksRoute from './routes/tasks.js'

dotenv.config()
const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use('/tasks', tasksRoute);
app.get('/test', (_req, res, _err) => res.json({ response: 'Hello World!' }))

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, () => {
        console.log("Connected to db")
    })
    /*
    const connection = mongoose.connection
    const collection = await connection.db('PersonalManagement').collection('Tasks')
    const query = await collection.find({ status: false })
    console.log(await query.toArray())
    await db.close()*/
})