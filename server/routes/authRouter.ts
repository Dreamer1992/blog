import express from 'express'
import authCtrl from '../controllers/authCtrl'
import {validateRegister} from '../middleware/validate'

const authRouter = express.Router()

authRouter.post('/register', validateRegister, authCtrl.register)

export default authRouter;