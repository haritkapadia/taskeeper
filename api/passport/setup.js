import passport from 'passport'
import bcrypt from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/User.js'

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const { name, _id } = await User.findById(id)
        return done(null, { name, _id })
    } catch (err) {
        return done(err)
    }
})

export const signup = async (name, password) => {
    const user = await User.findOne({ name })
    if (user) throw new Error("User exists")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = new User({ name, password: hash })
    await newUser.save()
}

passport.use(
    new LocalStrategy({ usernameField: "name" }, async (name, password, done) => {
        try {
            const user = await User.findOne({ name })
            if (!user) return done(null, false, { message: "User does not exist" })
            const passwordMatches = await bcrypt.compare(password, user.password)
            if (passwordMatches)
                return done(null, user)
            return done(null, false, {message: "Incorrect username or password" })
        } catch (err) {
            done(err)
        }
    })
)

export default passport
