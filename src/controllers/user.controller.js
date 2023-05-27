import User from '../models/User.model.js'
import cryptojs from 'crypto-js'
import { v4 } from 'uuid'
import  jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


class UserController {

    static createToken (email, id) {
        const payload = {
            email: email,
            id: id
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY_JWT)

        return token
    } 

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
                    const jwtPayload = UserController.createToken(findUser.email, findUser.id)
                    
                    res.status(200).json({token: jwtPayload})
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