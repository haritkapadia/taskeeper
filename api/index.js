import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import passport from './passport/setup.js'
import tasksRoute from './routes/tasks.js'
import categoriesRoute from './routes/categories.js'
import authRoute from './routes/auth.js'

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to db")
}).catch((err) => {
    console.log(err)
})

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION })
    })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoute)
app.use('/tasks', tasksRoute);
<<<<<<< HEAD
app.use('/categories', categoriesRoute);
app.get('/test', (_req, res, _err) => res.json({ response: 'Hello World!' }))
=======
>>>>>>> 3401810548655f0e0dcc3129c09c69336b6facfe

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
<<<<<<< HEAD
    await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, () => {
        console.log("Connected to db")
    })
})
=======
})
>>>>>>> 3401810548655f0e0dcc3129c09c69336b6facfe
