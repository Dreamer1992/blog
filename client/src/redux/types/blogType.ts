import { IBlogByCategoryId, IBlogByUserId, IBlogs } from "../../types/BlogTypes";

export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_BY_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID";
export const GET_BLOGS_BY_USER_ID = "GET_BLOGS_BY_USER_ID";

export interface IGetBlogsAction {
	type: typeof GET_BLOGS;
	payload: IBlogs[];
}

export interface IGetBlogsByCategoryIdAction {
	type: typeof GET_BLOGS_BY_CATEGORY_ID;
	payload: IBlogByCategoryId;
}

export interface IGetBlogsByUserIdAction {
	type: typeof GET_BLOGS_BY_USER_ID;
	payload: IBlogByUserId;
}

export type BlogTypes =
	| IGetBlogsAction
	| IGetBlogsByCategoryIdAction
	| IGetBlogsByUserIdAction;

