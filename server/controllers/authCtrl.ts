import {Request, Response} from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import {generateActiveToken, generateAccessToken, generateRefreshToken} from '../config/generateToken'
import sendEmail from '../config/sendMail'
import sendSms from '../config/sendSMS'
import {validateEmail, validatePhone} from '../middleware/validate'
import jwt from 'jsonwebtoken'
import {IDecodedToken, IUser} from '../config/interfaces'

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
    },

    login: async (req: Request, res: Response) => {
        try {
            const {account, password} = req.body;

            const user = await Users.findOne({account});
            if (!user) return res.status(400).json({msg: "Такого аккаунта не существует"});

            // if user exists
            loginUser(user, password, res);
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },

    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('refreshtoken', {path: `api/refresh_token`});
            return res.json({msg: 'Успешно разлогинены'});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },

    refreshToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({msg: "Пожалуйста, авторизуйтесь на сайте"});

            const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
            if (!decoded.id) return res.status(400).json({msg: "Пожалуйста, авторизуйтесь на сайте"});

            const user = await Users.findById(decoded.id).select("-password");
            if (!user) return res.status(400).json({msg: "Такого аккаунта не существует"});

            const access_token = generateAccessToken({id: user._id});

            res.json({access_token});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    }
}

const loginUser = async (user: IUser, password: string, res: Response) => {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({msg: "Неверный пароль"});

    const access_token = generateAccessToken({id: user._id});
    const refresh_token = generateRefreshToken({id: user._id});

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    })

    res.json({
        msg: 'Успешно авторизованы',
        access_token,
        user: {...user._doc, password: ''}
    })
}

export default authCtrl;