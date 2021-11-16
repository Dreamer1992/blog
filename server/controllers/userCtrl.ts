import {Response} from 'express';
import {IReqAuth} from "../config/interfaces";
import Users from '../models/userModel';
import bcrypt from 'bcrypt';

const userCtrl = {
    updateUser: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(500).json({msg: "Ошибка авторизации"});

        try {
            const {avatar, name} = req.body;

            await Users.findOneAndUpdate({_id: req.user.id}, {
                avatar, name
            });

            res.json({msg: "Данные пользователя обновлены"});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },

    resetPassword: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({msg: "Ошибка обновления пароля"});

        if (req.user.type !== 'register')
            return res.status(400).json({
                msg: `Изменение пароля недоступно с учетной записью ${req.user.type}`
            });

        try {
            const {password} = req.body;
            const passwordHash = await bcrypt.hash(password, 12);

            await Users.findOneAndUpdate({_id: req.user._id}, {
                password: passwordHash,
            });

            res.json({msg: "Пароль обновлен"});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },
};

export default userCtrl;