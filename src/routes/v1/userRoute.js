import express from 'express'
import { userController } from '~/controllers/userController'

const Router = express.Router()

// User registration endpoint
Router.route('/register')
  .post(userController.register)

export const userRoute = Router
