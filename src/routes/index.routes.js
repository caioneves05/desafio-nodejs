import express from 'express'
import user from './users.routes.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
      res.status(200).send({titulo: 'Welcome to api nodejs challenge'})
    })
  
    app.use(
      express.json(),
      user
    )
  }

export default routes