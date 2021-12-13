import { Dispatch } from "redux";
import { IComment } from "../../types/CommentTypes";
import { ALERT, IAlertAction } from "../types/alertType";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../api/FetchData";
import {
	CommentTypes,
	CREATE_COMMENT,
	CREATE_REPLY_COMMENT,
	DELETE_COMMENT,
	DELETE_REPLY_COMMENT,
	GET_COMMENTS,
	ICreateCommentAction,
	ICreateReplyCommentAction,
	IGetCommentsAction,
	UPDATE_COMMENT,
	UPDATE_REPLY_COMMENT,
} from "../types/commentType";

export const createComment = (
	data: IComment, token: string,
) => async (dispatch: Dispatch<IAlertAction | ICreateCommentAction>) => {
	try {
		const res = await postAPI("comment", data, token);

		dispatch({
			type: CREATE_COMMENT,
			payload: { ...res.data, user: data.user },
		});
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const getComments = (
	id: string, page: number,
) => async (dispatch: Dispatch<IAlertAction | IGetCommentsAction>) => {
	try {
		let limit = 4;
		const res = await getAPI(`comments/blog/${id}?page=${page}&limit=${limit}`);

		dispatch({
			type: GET_COMMENTS,
			payload: {
				data: res.data.comments,
				total: res.data.total,
			},
		});
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const replyComments = (
	data: IComment, token: string,
) => async (dispatch: Dispatch<IAlertAction | ICreateReplyCommentAction>) => {
	try {
		const res = await postAPI("reply_comment", data, token);

		dispatch({
			type: CREATE_REPLY_COMMENT,
			payload: {
				...res.data,
				user: data.user,
				reply_user: data.reply_user,
			},
		});
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const updateComment = (
	data: IComment, token: string,
) => async (dispatch: Dispatch<IAlertAction | CommentTypes>) => {
	try {
		dispatch({
			type: data.comment_root ? UPDATE_REPLY_COMMENT : UPDATE_COMMENT,
			payload: data,
		});

		await patchAPI(`comment/${data._id}`, { content: data.content }, token);
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const deleteComment = (
	data: IComment, token: string,
) => async (dispatch: Dispatch<IAlertAction | CommentTypes>) => {
	try {
		dispatch({
			type: data.comment_root ? DELETE_REPLY_COMMENT : DELETE_COMMENT,
			payload: data,
		});

		await deleteAPI(`comment/${data._id}`, token);
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};