import express from 'express'
import authCtrl from '../controllers/authCtrl'
import {validateRegister} from '../middleware/validate'

const authRouter = express.Router()

authRouter.post('/register', validateRegister, authCtrl.register)

authRouter.post('/active', authCtrl.activeAccount)

export default authRouter;