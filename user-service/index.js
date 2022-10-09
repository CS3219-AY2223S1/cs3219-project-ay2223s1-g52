import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { URI_FRONTEND } from './common/config.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use(cookieParser())

import {
  createUser,
  changePassword,
  deleteUser,
} from './controller/user-controller.js'
import { LoginAuth } from './controller/authentication-controller.js'
import { authentication } from './middleware/authentication.js'

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)
//login post http://localhost:8000/api/user/login
router.post('/login', LoginAuth)
router.post('/change-password', authentication, changePassword)
router.post('/delete-user', authentication, deleteUser)

app.use('/api/user', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'))
