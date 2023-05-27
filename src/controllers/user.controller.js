import User from '../models/User.model.js'

class UserController {
    static async createUser (req,res) {
        try{
            const user = new User(req.body)
            const userCreated = await user.save()

            res.status(201).json(userCreated)
        }
        catch(err) {
            res.status(400).json({ error: err.message })
        }
    }
}

export default UserController