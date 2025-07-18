import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from '~/config/corsOptions'
import { APIs_V1 } from '~/routes/v1/'

const START_SERVER = () => {
  // Initialize Express app
  const app = express()

  // Disable caching
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  // Middleware setup
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(express.json())

  // API routes
  app.use('/v1', APIs_V1)

  // Server configuration (move to environment variables in production)
  const LOCAL_DEV_APP_PORT = 8020
  const LOCAL_DEV_APP_HOST = 'localhost'
  const AUTHOR = 'Trander'
  app.listen(LOCAL_DEV_APP_PORT, LOCAL_DEV_APP_HOST, () => {
    console.log(`Local DEV: Hello ${AUTHOR}, Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`)
  })
}

// IIFE: Start the application
(async () => {
  try {
    START_SERVER()
  } catch (error) {
    process.exit(0)
  }
})()
