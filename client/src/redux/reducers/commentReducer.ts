import { IComment } from "../../types/CommentTypes";
import { CommentTypes, CREATE_COMMENT, CREATE_REPLY_COMMENT, GET_COMMENTS } from "../types/commentType";

type initialStateType = {
	data: IComment[];
	total: number;
}

const initialState: initialStateType = {
	data: [],
	total: 1,
};

const commentReducer = (state = initialState, action: CommentTypes): initialStateType => {
	switch (action.type) {
		case CREATE_COMMENT:
			return { ...state, data: [...state.data, action.payload] };
		case GET_COMMENTS:
			return action.payload;
		case CREATE_REPLY_COMMENT:
			return {
				...state,
				data: state.data.map(item => (
					item._id === action.payload.comment_root
						? {
							...item,
							replyCM: [
								...item.replyCM as [],
								action.payload,
							],
						}
						: item
				)),
			};
		default:
			return state;
	}
};

export default commentReducer;