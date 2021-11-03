import {Dispatch} from 'react';
import {IUserLogin} from "../../types/Types";
import {postAPI} from "../../api/FetchData";
import {AUTH, AuthType} from "../types/authType";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<AuthType>) => {
    try {
        const res = await postAPI('login', userLogin);
        console.log(res);

        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        })
    } catch (e: any) {
        console.log(e.response.data.msg);
    }
}