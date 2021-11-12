import {Response} from 'express';
import {IReqAuth} from "../config/interfaces";
import Users from '../models/userModel';

const userCtrl = {
    updateUser: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(500).json({msg: "Ошибка авторизации"});

        try {
            const {avatar, name} = req.body;

            await Users.findOneAndUpdate({_id: req.user.id}, {
                avatar, name
            });

            res.json({msg: "Успешно обновлено"});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },
};

export default userCtrl;