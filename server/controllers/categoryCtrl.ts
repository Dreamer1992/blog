import {Request, Response} from 'express';

import Categories from '../models/categoryModel';
import {IReqAuth} from "../config/interfaces";

const categoryCtrl = {
    createCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({msg: "Ошибка авторизации"});

        if (req.user.role !== 'admin')
            return res.status(400).json({msg: "Недостаточно прав"});

        try {
            const name = req.body.name.toLowerCase();

            const newCategory = new Categories({name});
            await newCategory.save();

            res.json({newCategory});
        } catch (e: any) {
            let errMsg;

            if (e.code === 11000) {
                errMsg = Object.values(e.keyValue)[0] + " существует";
            } else {
                let name = Object.keys(e.errors)[0];
                errMsg = e.errors[`${name}`].message;
            }

            return res.status(500).json({msg: errMsg});
        }
    },
    getCategories: async (req: Request, res: Response) => {
        try {
            const categories = await Categories.find().sort("-createdAt");

            res.json({categories});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },
    updateCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({msg: "Ошибка авторизации"});

        if (req.user.role !== 'admin')
            return res.status(400).json({msg: "Недостаточно прав"});

        try {
            await Categories.findOneAndUpdate({
                _id: req.params.id,
            }, {name: req.body.name});

            res.json({msg: "Успешно обновлено"});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },
    deleteCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({msg: "Ошибка авторизации"});

        if (req.user.role !== 'admin')
            return res.status(400).json({msg: "Недостаточно прав"});

        try {
            await Categories.findByIdAndDelete(req.params.id);

            res.json({msg: "Успешно удалено"});
        } catch (e: any) {
            return res.status(500).json({msg: e.message});
        }
    },
};

export default categoryCtrl;