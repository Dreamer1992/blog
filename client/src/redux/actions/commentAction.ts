import { Dispatch } from "redux";
import { IComment } from "../../types/CommentTypes";
import { ALERT, IAlertAction } from "../types/alertType";
import { deleteAPI, getAPI, patchAPI, postAPI } from "../../api/FetchData";
import {
	CommentTypes,
	DELETE_COMMENT,
	DELETE_REPLY_COMMENT,
	GET_COMMENTS,
	ICreateCommentAction,
	ICreateReplyCommentAction,
	IGetCommentsAction,
	UPDATE_COMMENT,
	UPDATE_REPLY_COMMENT,
} from "../types/commentType";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const createComment = (
	data: IComment, token: string,
) => async (dispatch: Dispatch<IAlertAction | ICreateCommentAction>) => {
	const result = await checkTokenExp(token, dispatch);
	const access_token = result ? result : token;

	try {
		await postAPI("comment", data, access_token);
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
	const result = await checkTokenExp(token, dispatch);
	const access_token = result ? result : token;

	try {
		await postAPI("reply_comment", data, access_token);
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const updateComment = (
	data: IComment, token: string,
) => async (dispatch: Dispatch<IAlertAction | CommentTypes>) => {
	const result = await checkTokenExp(token, dispatch);
	const access_token = result ? result : token;

	try {
		dispatch({
			type: data.comment_root ? UPDATE_REPLY_COMMENT : UPDATE_COMMENT,
			payload: data,
		});

		await patchAPI(`comment/${data._id}`, { data }, access_token);
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const deleteComment = (
	data: IComment, token: string,
) => async (dispatch: Dispatch<IAlertAction | CommentTypes>) => {
	const result = await checkTokenExp(token, dispatch);
	const access_token = result ? result : token;

	try {
		dispatch({
			type: data.comment_root ? DELETE_REPLY_COMMENT : DELETE_COMMENT,
			payload: data,
		});

		await deleteAPI(`comment/${data._id}`, access_token);
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};