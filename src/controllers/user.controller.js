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

    static async loginUser (req,res) {
        try{
            const user = new User(req.body)

            if(user.email && user.password) {
                const findPassword = await cryptojs.SHA256(user.password).toString()
                
                const findUser = await User.findOne({
                    email: { $eq: user.email },
                    password : { $eq: findPassword }
                })

                if(findUser) {
                    res.status(200).json({
                        id: findUser.id,
                        email: findUser.email
                    })
                }
                else {
                    res.status(401).json({ error: 'Email or password are incorrect' })
                }
            } 
            else {
                res.status(400).json({message: 'Email or password are required'})
            }

        }catch(err){
            res.status(400).json({ error: err.message })
        }
    }
}

export default UserController