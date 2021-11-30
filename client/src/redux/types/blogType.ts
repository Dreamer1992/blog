import { IBlogByCategoryId, IBlogByUserId, IBlogs } from "../../types/BlogTypes";

export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_BY_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID";
export const GET_BLOGS_BY_USER_ID = "GET_BLOGS_BY_USER_ID";

export interface IGetBlogs {
	type: typeof GET_BLOGS;
	payload: IBlogs[];
}

export interface IGetBlogsByCategoryId {
	type: typeof GET_BLOGS_BY_CATEGORY_ID;
	payload: IBlogByCategoryId;
}

export interface IGetBlogsByUserId {
	type: typeof GET_BLOGS_BY_USER_ID;
	payload: IBlogByUserId;
}

export type BlogTypes =
	| IGetBlogs
	| IGetBlogsByCategoryId
	| IGetBlogsByUserId;

