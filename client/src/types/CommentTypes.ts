import { IUser } from "./Types";

export interface IComment {
	_id?: string,
	user: IUser,
	blog_id: string,
	blog_user_id: string,
	content: string,
	replyCM?: IComment[],
	reply_user?: string,
	createdAt: string,
}

export interface IGetComments {
	data: IComment[];
	total: number;
}