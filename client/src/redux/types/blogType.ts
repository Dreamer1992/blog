import { IBlog, IBlogByCategoryId, IBlogByUserId, IBlogs } from "../../types/BlogTypes";

export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_BY_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID";
export const GET_BLOGS_BY_USER_ID = "GET_BLOGS_BY_USER_ID";
export const CREATE_BLOG_BY_USER_ID = "CREATE_BLOG_BY_USER_ID";
export const DELETE_BLOG_BY_USER_ID = "DELETE_BLOG_BY_USER_ID";

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

export interface ICreateBlogByUserIdAction {
	type: typeof CREATE_BLOG_BY_USER_ID;
	payload: IBlog;
}

export interface IDeleteBlogByUserIdAction {
	type: typeof DELETE_BLOG_BY_USER_ID;
	payload: IBlog;
}

export type BlogTypes =
	| IGetBlogsAction
	| IGetBlogsByCategoryIdAction
	| IGetBlogsByUserIdAction
	| IDeleteBlogByUserIdAction
	| ICreateBlogByUserIdAction;

