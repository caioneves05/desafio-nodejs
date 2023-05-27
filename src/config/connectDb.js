import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect( process.env.MONGO_URI)

let db = mongoose.connection

export default db