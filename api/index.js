import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.get('/test', (_req, res, _err) => res.json({ response: 'Hello World!' }))

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    const client = new MongoClient(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect();
    const collection = await client.db('PersonalManagement').collection('Tasks')
    const query = await collection.find({ status: false })
    console.log(await query.toArray())
    await client.close()
})