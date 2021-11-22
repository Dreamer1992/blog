import { AUTH, IAuth, IAuthAction } from '../types/authType';

const authReducer = (state: IAuth = {}, action: IAuthAction): IAuth => {
	switch (action.type) {
		case AUTH: {
			return action.payload;
		}
		default:
			return state;
	}
};

export default authReducer;
