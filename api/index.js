import express from "express"

const PORT = process.env.PORT || 8000

const app = express()

app.get("/test", (_req, res, _err) => res.json({ response: "Hello World!" }))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
