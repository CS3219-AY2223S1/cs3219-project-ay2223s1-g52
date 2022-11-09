import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {
  URI_FRONTEND,
  PREFIX_LOGIN,
  PREFIX_CHANGE_PASSWORD,
  PREFIX_DELETE,
} from './common/config.js'

export const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: [URI_FRONTEND, 'http://localhost'],
  })
) // config cors so that front-end can use
app.options('*', cors())

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

router.post(PREFIX_LOGIN, LoginAuth)
router.post(PREFIX_CHANGE_PASSWORD, authentication, changePassword) // TODO: should change to PUT
router.post(PREFIX_DELETE, authentication, deleteUser) // TODO: should change to DELETE

app.use('/api/user', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'))
