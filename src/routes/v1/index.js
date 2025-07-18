import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from '~/routes/v1/userRoute'

const Router = express.Router()

// Health check endpoint
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

// User routes
Router.use('/users', userRoute)

export const APIs_V1 = Router
