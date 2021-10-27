import {Request, Response} from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import {generateActiveToken} from '../config/generateToken'
import sendEmail from '../config/sendMail'
import sendSms from '../config/sendSMS'
import {validateEmail, validatePhone} from '../middleware/validate'
import jwt from 'jsonwebtoken'
import {IDecodedToken} from '../config/inrterface'

const CLIENT_URL = `${process.env.BASE_URL}`

const authCtrl = {
    register: async (req: Request, res: Response) => {
        try {
            const {name, account, password} = req.body;

            const user = await Users.findOne({account})
            if (user) return res.status(400).json({msg: "Почта или номер телефона уже существует"})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {name, account, password: passwordHash}

            const active_token = generateActiveToken({newUser})

            const url = `${CLIENT_URL}/active/${active_token}`

            if (validateEmail(account)) {
                sendEmail(account, url, 'Подтвердите свой адрес электронной почты')
                return res.json({msg: "Успешно. Пожалуйста, проверьте свою электронную почту"})
            } else if (validatePhone(account)) {
                sendSms(account, url, 'Подтвердите номер телефона')
                return res.json({msg: "Успешно. Сообщение отправлено на номер телефона"})
            }
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },

    activeAccount: async (req: Request, res: Response) => {
        try {
            const {active_token} = req.body;

            const decoder = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);

            const {newUser} = decoder;
            if (!newUser) return res.status(400).json({msg: 'Неверная идентификация'})

            const user = new Users(newUser);

            await user.save();
            res.json({msg: 'Аккаунт был активирован'})
        } catch (err: any) {
            let errMsg;

            if (err.code === 11000) {
                errMsg = 'Аккаунт уже существует';
            } else {
                let name = Object.keys(err.errors)[0];
                errMsg = err.errors[`${name}`].message;
            }

            return res.status(500).json({msg: errMsg})
        }
    }
}

export default authCtrl;