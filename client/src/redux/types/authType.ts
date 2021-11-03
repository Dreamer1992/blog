import {IUser} from "../../types/Types";

export const AUTH = 'AUTH';

export interface IAuth {
    token?: string;
    user?: IUser;
}

export interface IAuthAction {
    type: typeof AUTH;
    payload: IAuth;
}

export type AuthType = IAuthAction;