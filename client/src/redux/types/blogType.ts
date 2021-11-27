import { IBlog } from "../../types/BlogTypes";

export const GET_BLOGS = "GET_BLOGS";

export interface IBlogs {
	_id: string,
	name: string,
	count: number,
	blogs: IBlog[],
}

export interface IGetBlogs {
	type: typeof GET_BLOGS,
	payload: IBlogs[],
}

export type BlogTypes = IGetBlogs;

