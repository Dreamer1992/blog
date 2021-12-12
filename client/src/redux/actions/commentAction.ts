import { Dispatch } from "redux";
import { IComment } from "../../types/CommentTypes";
import { ALERT, IAlertAction } from "../types/alertType";
import { getAPI, postAPI } from "../../api/FetchData";
import {
	CREATE_COMMENT,
	CREATE_REPLY_COMMENT,
	GET_COMMENTS,
	ICreateCommentAction,
	ICreateReplyCommentAction,
	IGetCommentsAction,
} from "../types/commentType";

export const createComment = (
	data: IComment,
	token: string,
) => async (dispatch: Dispatch<IAlertAction | ICreateCommentAction>) => {
	try {
		const res = await postAPI("comment", data, token);

		dispatch({
			type: CREATE_COMMENT,
			payload: { ...res.data, user: data.user },
		});
		console.log(res);
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const getComments = (
	id: string,
) => async (dispatch: Dispatch<IAlertAction | IGetCommentsAction>) => {
	try {
		let limit = 6;
		const res = await getAPI(`comments/blog/${id}?limit=${limit}`);

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
	data: IComment,
	token: string,
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