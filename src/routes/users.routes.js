import express from 'express'
import UserController from '../controllers/user.controller.js'

const router = express.Router()

router
    .post('/user', UserController.createUser)
    .post('/user', UserController.loginUser)
    .get('/user/search', UserController.searchUser)


export default router