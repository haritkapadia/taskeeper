import express from 'express'
import Category from '../models/Category.js'

const router = express.Router()

//Get all Categories
router.get('/', async (req, res) => {
    const query = await Category.find()
    res.json(query)
})

//Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const query = await Category.findById({ _id: req.params.id })
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Category doesn't exist" })
    }
})

//Post new category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        colour: req.body.colour
    })
    await category.save()
    res.json(category)
})

//Update category
router.patch("/:id", async (req, res) => {
    try {
        const query = await Category.updateOne({ _id: req.params.id }, req.body)
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Could not update category" })
    }
})

//Delete category by ID
router.delete("/:id", async (req, res) => {
    try {
        const query = await Category.deleteOne({ _id: req.params.id })
        res.json(query)
    } catch (err) {
        res.status(404)
        res.send({ error: "Could not delete category" })
    }
})

export default router