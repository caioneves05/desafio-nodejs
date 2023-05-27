import express from 'express'
import UserController from '../controllers/user.controller.js'

const router = express.Router()

router
    .post('/user', UserController.createUser)
    .get('/user', UserController.loginUser)


export default router