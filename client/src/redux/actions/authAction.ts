import {Dispatch} from 'react';
import {IUserLogin} from "../../types/Types";
import {postAPI} from "../../api/FetchData";
import {AUTH, AuthType} from "../types/authType";
import {ALERT, AlertType} from "../types/alertType";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<AuthType | AlertType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}});
        const res = await postAPI('login', userLogin);

        dispatch({
            type: AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });

        dispatch({type: ALERT, payload: {success: "Успешно зарегистрированы"}});
    } catch (e: any) {
        dispatch({type: ALERT, payload: {errors: e.response.data.msg}});
    }
}