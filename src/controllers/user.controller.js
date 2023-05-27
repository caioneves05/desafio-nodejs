import User from '../models/User.model.js'
import cryptojs from 'crypto-js'
import { v4 } from 'uuid'

class UserController {
    static async createUser (req,res) {
        try{
            const user = new User(req.body)

            const hashedPassword = await cryptojs.SHA256(user.password).toString()
            user.password = hashedPassword
            user.id = v4()

            await user.save()

            res.status(201).json({
                id: `${user.id}`,
                creat_at: `${user.created_at}`,
                modified_at: `${user.modified_at}`
            })
        }
        catch(err) {
            res.status(400).json({ error: err.message })
        }
    }
}

export default UserController