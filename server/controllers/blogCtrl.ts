import { Request, Response } from "express";
import mongoose from "mongoose";
import Blogs from "../models/blogModel";
import Comments from "../models/commentModel";
import { IReqAuth } from "../config/interfaces";

const Pagination = (req: IReqAuth) => {
	let page = Number(req.query.page) || 1;
	let limit = Number(req.query.limit) || 4;
	let skip = (page - 1) * limit;

	return { page, limit, skip };
};

const blogCtrl = {
	createBlog: async (req: IReqAuth, res: Response) => {
		if (!req.user) return res.status(400).json({ msg: "Ошибка авторизации" });

		try {
			const { title, content, description, thumbnail, category } = req.body;

			const newBlog = new Blogs({
				user: req.user._id,
				title,
				content,
				description,
				thumbnail,
				category,
			});

			await newBlog.save();
			res.json({
				...newBlog._doc,
				user: req.user,
			});
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},

	getBlogs: async (req: Request, res: Response) => {
		try {
			const blogs = await Blogs.aggregate([
				// User
				{
					$lookup: {
						from: "users",
						let: { user_id: "$user" },
						pipeline: [
							{ $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
							{ $project: { password: 0 } },
						],
						as: "user",
					},
				},
				// array -> object
				{ $unwind: "$user" },
				// Category
				{
					$lookup: {
						from: "categories",
						localField: "category",
						foreignField: "_id",
						as: "category",
					},
				},
				// array -> object
				{ $unwind: "$category" },
				// Sorting
				{ $sort: { "createdAt": -1 } },
				// Group by category
				{
					$group: {
						_id: "$category._id",
						name: { $first: "$category.name" },
						blogs: { $push: "$$ROOT" },
						count: { $sum: 1 },
					},
				},
				// Pagination for blogs
				{
					$project: {
						blogs: {
							$slice: ["$blogs", 0, 4],
						},
						count: 1,
						name: 1,
					},
				},
			]);

			res.json(blogs);
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},

	getBlogsByCategory: async (req: Request, res: Response) => {
		const { limit, skip } = Pagination(req);

		try {
			const data = await Blogs.aggregate([
				{
					$facet: {
						totalData: [
							{
								$match: { category: new mongoose.Types.ObjectId(req.params.id) },
							},
							{
								$lookup: {
									from: "users",
									let: { user_id: "$user" },
									pipeline: [
										{ $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
										{ $project: { password: 0 } },
									],
									as: "user",
								},
							},
							// array -> object
							{ $unwind: "$user" },
							// Sorting
							{ $sort: { createdAt: -1 } },
							{ $skip: skip },
							{ $limit: limit },
						],
						totalCount: [
							{
								$match: {
									category: new mongoose.Types.ObjectId(req.params.id),
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

			const blogs = data[0].totalData;
			const count = data[0].count;

			// Pagination
			let total = 0;

			if (count % limit === 0) {
				total = count / limit;
			} else {
				total = Math.floor(count / limit) + 1;
			}

			res.json({ blogs, total });
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},

	getBlogsByUser: async (req: Request, res: Response) => {
		const { limit, skip } = Pagination(req);

		try {
			const data = await Blogs.aggregate([
				{
					$facet: {
						totalData: [
							{
								$match: { user: new mongoose.Types.ObjectId(req.params.id) },
							},
							{
								$lookup: {
									from: "users",
									let: { user_id: "$user" },
									pipeline: [
										{ $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
										{ $project: { password: 0 } },
									],
									as: "user",
								},
							},
							// array -> object
							{ $unwind: "$user" },
							// Sorting
							{ $sort: { createdAt: -1 } },
							{ $skip: skip },
							{ $limit: limit },
						],
						totalCount: [
							{
								$match: {
									user: new mongoose.Types.ObjectId(req.params.id),
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

			const blogs = data[0].totalData;
			const count = data[0].count;

			// Pagination
			let total = 0;

			if (count % limit === 0) {
				total = count / limit;
			} else {
				total = Math.floor(count / limit) + 1;
			}

			res.json({ blogs, total });
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},

	getBlogDetail: async (req: Request, res: Response) => {
		try {
			const blog = await Blogs.findOne({ _id: req.params.id })
				.populate("user", "-password");

			if (!blog) return res.status(400).json({ msg: "Такого блога не существует" });

			return res.json(blog);
		} catch (e: any) {
			return res.status(400).json({ msg: "Такого блога не существует" });
		}
	},

	updateBlog: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Ошибка авторизации" });

		try {
			const blog = await Blogs.findOneAndUpdate({
				_id: req.params.id,
				user: req.user._id,
			}, req.body);

			if (!blog)
				return res.status(400).json({ msg: "Блог не найден" });

			res.json({ msg: "Успешно обновлено", blog });
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},

	deleteBlog: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ msg: "Ошибка авторизации" });

		try {
			// Delete Blog
			const blog = await Blogs.findOneAndDelete({
				_id: req.params.id,
				user: req.user._id,
			});

			if (!blog)
				return res.status(400).json({ msg: "Ошибка авторизации" });

			// Delete Comments
			await Comments.deleteMany({ blog_id: blog._id });

			res.json({ msg: "Блог удален" });
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},

	searchBlogs: async (req: Request, res: Response) => {
		try {
			const blogs = await Blogs.aggregate([
				{
					$search: {
						index: "searchTitle",
						autocomplete: {
							query: `${req.query.title}`,
							path: "title",
						},
					},
				},
				{ $sort: { createdAt: -1 } },
				{ $limit: 5 },
				{
					$project: {
						title: 1,
						description: 1,
						thumbnail: 1,
						createdAt: 1,
					},
				},
			]);

			if (!blogs.length)
				return res.status(400).json({ msg: "Нет блогов" });

			res.json(blogs);
		} catch (e: any) {
			return res.status(500).json({ msg: e.message });
		}
	},
};

export default blogCtrl;
