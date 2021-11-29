import { IUser } from "../../types/Types";
import { GET_OTHER_INFO, ProfileTypes } from "../types/profileType";

type InitialStateType = {
	info: IUser | null;
};

const initialState: InitialStateType = {
	info: null,
};

const profileReducer = (state = initialState, action: ProfileTypes): InitialStateType => {
	switch (action.type) {
		case GET_OTHER_INFO:
			return { ...state, info: action.payload };
		default:
			return state;
	}
};

export default profileReducer;