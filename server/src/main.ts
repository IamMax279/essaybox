import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

dotenv.config()
const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 3001
app.listen(PORT)