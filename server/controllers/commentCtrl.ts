import { Request, Response } from "express";
import Comments from "../models/commentModel";
import { IReqAuth } from "../config/interfaces";
import mongoose from "mongoose";

const Pagination = (req: IReqAuth) => {
	let page = Number(req.query.page) || 1;
	let limit = Number(req.query.limit) || 4;
	let skip = (page - 1) * limit;

	return { page, limit, skip };
};

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

	getComments: async (req: Request, res: Response) => {
		const { limit, skip } = Pagination(req);

		try {
			const data = await Comments.aggregate([
				{
					$facet: {
						totalData: [
							{
								$match: {
									blog_id: new mongoose.Types.ObjectId(req.params.id),
								},
							},
							{
								$lookup: {
									from: "users",
									localField: "user",
									foreignField: "_id",
									as: "user",
								},
							},
							{ $unwind: "$user" },
							{ $sort: { createdAt: -1 } },
							{ $skip: skip },
							{ $limit: limit },
						],
						totalCount: [
							{
								$match: {
									blog_id: new mongoose.Types.ObjectId(req.params.id),
								},
							},
							{ $count: "count" },
						],
					},
				},
				{
					$project: {
						count: { $arrayElemAt: ["$totalCount.count", 0] },
						totalData: 1,
					},
				},
			]);

			const comments = data[0].totalData;
			const count = data[0].count;

			let total ;

			if (count % limit === 0) {
				total = count / limit;
			} else {
				total = Math.floor(count / limit) + 1;
			}

			res.json({ comments, total });
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},
};

export default commentCtrl;