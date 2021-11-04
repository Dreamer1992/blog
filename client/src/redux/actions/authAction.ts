import {Dispatch} from 'react';
import {IUserLogin, IUserRegister} from "../../types/Types";
import {postAPI} from "../../api/FetchData";
import {AUTH, AuthType} from "../types/authType";
import {ALERT, AlertType} from "../types/alertType";
import validateRegister from "../../utils/validate";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<AuthType | AlertType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}});
        const res = await postAPI('login', userLogin);

        dispatch({type: AUTH, payload: res.data});

        dispatch({type: ALERT, payload: {success: res.data.msg}});
    } catch (e: any) {
        dispatch({type: ALERT, payload: {errors: e.response.data.msg}});
    }
}

export const register = (userRegister: IUserRegister) => async (dispatch: Dispatch<AuthType | AlertType>) => {
    const check = validateRegister(userRegister);

    if (check.errLength > 0) {
        return dispatch({type: ALERT, payload: {errors: check.errMsg}});
    }

    try {
        dispatch({type: ALERT, payload: {loading: true}});

        const res = await postAPI('register', userRegister);
        console.log(res)

        dispatch({type: ALERT, payload: {success: res.data.msg}});
    } catch (e: any) {
        dispatch({type: ALERT, payload: {errors: e.response.data.msg}});
    }
}