import express from 'express'
import passport from 'passport'
import { signup } from '../passport/setup.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { name, password } = req.body
    try {
        await signup(name, password)
        return res.status(200).json({ success: true })
    } catch (errors) {
        return res.status(400).json({ errors })
    }
})

router.post('/login', passport.authenticate('local'), (_req, res) => {
    return res.status(200).json({ success: true })
})

router.post('/logout', passport.authenticate('local'), (req, res) => {
    req.logout()
    res.json({ success: true })
})

export default router
