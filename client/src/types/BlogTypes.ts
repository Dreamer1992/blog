import { IUser } from "./Types";

export interface IBlog {
	_id?: string;
	user: string | IUser;
	title: string;
	content: string;
	description: string;
	thumbnail: string | File;
	category: string;
	createdAt: string;
}

export interface IBlogs {
	_id: string,
	name: string,
	count: number,
	blogs: IBlog[],
}

export interface IBlogByCategoryId {
	id: string;
	blogs: IBlog[];
	total: number;
	search: string;
}

export interface IBlogByUserId {
	id: string;
	blogs: IBlog[];
	total: number;
	search: string;
}

export interface IBlogByUserId {
	id: string;
	blogs: IBlog[];
	total: number;
	search: string;
}