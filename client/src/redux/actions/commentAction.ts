import { Dispatch } from "redux";
import { IComment } from "../../types/CommentTypes";
import { ALERT, IAlertAction } from "../types/alertType";
import { postAPI } from "../../api/FetchData";
import { CREATE_COMMENT, ICreateCommentAction } from "../types/commentType";

export const createComment = (data: IComment, token: string) => async (dispatch: Dispatch<IAlertAction | ICreateCommentAction>) => {
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