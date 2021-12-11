import { IUser } from "../../types/Types";

export const GET_OTHER_INFO = "GET_OTHER_INFO";

export interface IGetOtherInfoAction {
	type: typeof GET_OTHER_INFO;
	payload: IUser;
}

export type ProfileTypes =
	| IGetOtherInfoAction;