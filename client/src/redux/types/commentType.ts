import { IComment, IGetComments } from "../../types/CommentTypes";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";

export interface ICreateCommentAction {
	type: typeof CREATE_COMMENT;
	payload: IComment;
}

export interface IGetCommentsAction {
	type: typeof GET_COMMENTS;
	payload: IGetComments;
}

export type CommentTypes =
	| ICreateCommentAction
	| IGetCommentsAction;