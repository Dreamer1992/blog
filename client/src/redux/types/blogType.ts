import { IBlogByCategoryId, IBlogs } from "../../types/BlogTypes";

export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_BY_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID";

export interface IGetBlogs {
	type: typeof GET_BLOGS;
	payload: IBlogs[];
}

export interface IGetBlogsByCategoryId {
	type: typeof GET_BLOGS_BY_CATEGORY_ID;
	payload: IBlogByCategoryId;
}

export type BlogTypes =
	| IGetBlogs
	| IGetBlogsByCategoryId;

