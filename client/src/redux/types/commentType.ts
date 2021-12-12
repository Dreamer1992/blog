import { IComment, IGetComments } from "../../types/CommentTypes";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const CREATE_REPLY_COMMENT = "CREATE_REPLY_COMMENT";
export const UPDATE_REPLY_COMMENT = "UPDATE_REPLY_COMMENT";

export interface ICreateCommentAction {
	type: typeof CREATE_COMMENT;
	payload: IComment;
}

export interface IGetCommentsAction {
	type: typeof GET_COMMENTS;
	payload: IGetComments;
}

export interface ICreateReplyCommentAction {
	type: typeof CREATE_REPLY_COMMENT;
	payload: IComment;
}

export interface IUpdateReplyCommentAction {
	type: typeof UPDATE_REPLY_COMMENT | typeof UPDATE_COMMENT;
	payload: IComment;
}

export type CommentTypes =
	| ICreateCommentAction
	| IGetCommentsAction
	| ICreateReplyCommentAction
	| IUpdateReplyCommentAction;