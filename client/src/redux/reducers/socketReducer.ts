import { ISocketAction, SOCKET } from "../types/socketTypes";

const socketReducer = (state: any = null, action: ISocketAction): any => {
	switch (action.type) {
		case SOCKET:
			return action.payload;
		default:
			return state;
	}
};

export default socketReducer;