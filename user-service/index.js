import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { URI_FRONTEND, PREFIX_LOGIN, PREFIX_DELETE, PREFIX_CHANGE_PASSWORD, PREFIX_USER_SVC } from "./common/config.js";

export const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({credentials: true, origin: URI_FRONTEND})) // config cors so that front-end can use
app.options('*', cors())
app.use(cookieParser())

import { createUser, changePassword, deleteUser } from './controller/user-controller.js';
import { LoginAuth } from './controller/authentication-controller.js';
import { authentication } from './middleware/authentication.js';

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)
//login post http://localhost:8000/api/user/login
router.post(PREFIX_LOGIN, LoginAuth)
router.post(PREFIX_CHANGE_PASSWORD, authentication, changePassword)
router.post(PREFIX_DELETE, authentication, deleteUser)

app.use(PREFIX_USER_SVC, router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));