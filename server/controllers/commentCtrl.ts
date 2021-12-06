import { Response } from "express";
import Comments from "../models/commentModel";
import { IReqAuth } from "../config/interfaces";

const commentCtrl = {
	createComment: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Ошибка авторизации" });

		try {
			const {
				content,
				blog_id,
				blog_user_id,
			} = req.body;

			const newComment = new Comments({
				user: req.user._id,
				content,
				blog_id,
				blog_user_id,
			});

			await newComment.save();

			return res.json(newComment);
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},
};

export default commentCtrl;