import { IComment } from "../../types/CommentTypes";

export const CREATE_COMMENT = "CREATE_COMMENT";

export interface ICreateCommentAction {
	type: typeof CREATE_COMMENT;
	payload: IComment;
}

export type CommentTypes =
	| ICreateCommentAction;