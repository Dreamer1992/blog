import { IComment } from "../../types/CommentTypes";
import { CommentTypes, CREATE_COMMENT, GET_COMMENTS } from "../types/commentType";

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
		default:
			return state;
	}
};

export default commentReducer;