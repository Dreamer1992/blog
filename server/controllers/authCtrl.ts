import {Request, Response} from 'express';
import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import {generateAccessToken, generateActiveToken, generateRefreshToken} from '../config/generateToken';
import sendEmail from '../config/sendMail';
import {sendSms, smsOTP, smsVerify} from '../config/sendSMS';
import {validateEmail, validatePhone} from '../middleware/validate';
import jwt from 'jsonwebtoken';
import {IDecodedToken, IGgPayload, IUser, IUserParams} from '../config/interfaces';
import {OAuth2Client} from "google-auth-library";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `${process.env.BASE_URL}`;

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
                return res.json({msg: "Пожалуйста, проверьте свою электронную почту"})
            } else if (validatePhone(account)) {
                sendSms(account, url, 'Подтвердите номер телефона')
                return res.json({msg: "Сообщение отправлено на номер телефона"})
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
            if (!newUser) return res.status(400).json({msg: 'Неверная идентификация'});

            const userCheck = await Users.findOne({account: newUser.account});
            if (userCheck) return res.status(400).json({msg: "Этот аккаунт уже существует"})

            const user = new Users(newUser);
            await user.save();

            return res.json({msg: 'Аккаунт был активирован'});
        } catch (err: any) {
            return res.status(500).json({msg: err.message});
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
            res.clearCookie('refresh_token', {path: `/`});
            return res.json({msg: 'Успешно разлогинены'});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },

    refreshToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refresh_token;
            if (!rf_token) return res.status(400).json({msg: "Пожалуйста, авторизуйтесь на сайте"});

            const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
            if (!decoded.id) return res.status(400).json({msg: "Пожалуйста, авторизуйтесь на сайте"});

            const user = await Users.findById(decoded.id);
            if (!user) return res.status(400).json({msg: "Такого аккаунта не существует"});

            const access_token = generateAccessToken({id: user._id});

            res.json({access_token, user});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },

    googleLogin: async (req: Request, res: Response) => {
        try {
            const {tokenId} = req.body;

            const verify = await client.verifyIdToken({
                idToken: tokenId, audience: `${process.env.MAIL_CLIENT_ID}`
            });

            const {email, email_verified, name, picture} = <IGgPayload>verify.getPayload();
            if (!email_verified) return res.status(500).json({msg: 'Ошибка проверки электронной почты'});

            const password = email + 'your google secret password';
            const passwordHash = await bcrypt.hash(password, 12);

            const user = await Users.findOne({account: email});

            if (user) {
                await loginUser(user, password, res);
            } else {
                const user = {
                    name,
                    account: email,
                    password: passwordHash,
                    avatar: picture,
                    type: 'login'
                };
                await registerUser(user, res);
            }
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },

    loginSMS: async (req: Request, res: Response) => {
        try {
            const {phone} = req.body;
            const data = await smsOTP(phone, 'sms');

            res.json(data);
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },

    smsVerify: async (req: Request, res: Response) => {
        try {
            const {phone, code} = req.body;
            const data = await smsVerify(phone, code);

            if (!data?.valid) return res.status(400).json({msg: "Введен неверный код"});

            const password = phone + 'your phone secret password';
            const passwordHash = await bcrypt.hash(password, 12);

            const user = await Users.findOne({account: phone});

            if (user) {
                loginUser(user, password, res);
            } else {
                const user = {
                    name: phone,
                    account: phone,
                    password: passwordHash,
                    type: 'login',
                };

                registerUser(user, res);
            }
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },
}

const loginUser = async (user: IUser, password: string, res: Response) => {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({msg: "Неверный пароль"});

    const access_token = generateAccessToken({id: user._id});
    const refresh_token = generateRefreshToken({id: user._id});

    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: `/`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    })

    res.json({
        msg: 'Успешно авторизованы',
        access_token,
        user: {...user._doc, password: ''}
    })
}

const registerUser = async (user: IUserParams, res: Response) => {
    const newUser = new Users(user);
    await newUser.save()

    const access_token = generateAccessToken({id: newUser._id});
    const refresh_token = generateRefreshToken({id: newUser._id});

    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: `/`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    })

    res.json({
        msg: 'Успешно авторизованы',
        access_token,
        user: {...newUser._doc, password: ''}
    })
}

export default authCtrl;