import { IComment } from "../../types/CommentTypes";
import {
	CommentTypes,
	CREATE_COMMENT,
	CREATE_REPLY_COMMENT,
	DELETE_COMMENT,
	DELETE_REPLY_COMMENT,
	GET_COMMENTS,
	UPDATE_COMMENT,
	UPDATE_REPLY_COMMENT,
} from "../types/commentType";

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
								action.payload,
								...item.replyCM as [],
							],
						}
						: item
				)),
			};
		case UPDATE_COMMENT:
			return {
				...state,
				data: state.data.map(item => (
					item._id === action.payload._id
						? action.payload
						: item
				)),
			};
		case UPDATE_REPLY_COMMENT:
			return {
				...state,
				data: state.data.map(item => (
					item._id === action.payload.comment_root
						? {
							...item,
							replyCM: item.replyCM?.map(rp => (
								rp._id === action.payload._id
									? action.payload
									: rp
							)),
						}
						: item
				)),
			};
		case DELETE_COMMENT:
			return {
				...state,
				data: state.data.filter(item =>
					item._id !== action.payload._id,
				),
			};
		case DELETE_REPLY_COMMENT:
			return {
				...state,
				data: state.data.map(item => (
					item._id === action.payload.comment_root
						? {
							...item,
							replyCM: item.replyCM?.filter(rp => (
								rp._id !== action.payload._id
							)),
						}
						: item
				)),
			};
		default:
			return state;
	}
};

export default commentReducer;