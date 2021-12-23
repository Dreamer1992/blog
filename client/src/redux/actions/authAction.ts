import { Dispatch } from "react";
import { IUserLogin, IUserRegister } from "../../types/Types";
import { getAPI, postAPI } from "../../api/FetchData";
import { AUTH, AuthType } from "../types/authType";
import { ALERT, AlertType } from "../types/alertType";
import { validatePhone, validateRegister } from "../../utils/validate";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const login =
	(userLogin: IUserLogin) => async (dispatch: Dispatch<AuthType | AlertType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });
			const res = await postAPI("login", userLogin);

			dispatch({ type: AUTH, payload: res.data });

			dispatch({ type: ALERT, payload: { success: res.data.msg } });
			localStorage.setItem("logged", "true");
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
		}
	};

export const register =
	(userRegister: IUserRegister) => async (dispatch: Dispatch<AuthType | AlertType>) => {
		const check = validateRegister(userRegister);

		if (check.errLength > 0) {
			return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
		}

		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await postAPI("register", userRegister);

			dispatch({ type: ALERT, payload: { success: res.data.msg } });
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
		}
	};

export const refreshToken = () => async (dispatch: Dispatch<AuthType | AlertType>) => {
	const isLogged = localStorage.getItem("logged");
	if (!isLogged) return;

	try {
		dispatch({ type: ALERT, payload: { loading: true } });

		const res = await getAPI("refresh_token");
		dispatch({ type: AUTH, payload: res.data });

		dispatch({ type: ALERT, payload: {} });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const logout = (token: string) => async (dispatch: Dispatch<AuthType | AlertType>) => {
	const result = await checkTokenExp(token, dispatch);
	const access_token = result ? result : token;

	try {
		localStorage.removeItem("logged");
		await getAPI("logout", access_token);
		window.location.href = "/";
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const googleLogin =
	(tokenId: string) => async (dispatch: Dispatch<AuthType | AlertType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });
			const res = await postAPI("google_login", { tokenId });

			dispatch({ type: AUTH, payload: res.data });

			dispatch({ type: ALERT, payload: { success: res.data.msg } });
			localStorage.setItem("logged", "true");
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
		}
	};

export const loginSMS = (phone: string) => async (dispatch: Dispatch<AuthType | AlertType>) => {
	const check = validatePhone(phone);
	if (!check)
		return dispatch({ type: ALERT, payload: { errors: "Неверный формат номера телефона" } });

	try {
		dispatch({ type: ALERT, payload: { loading: true } });
		const res = await postAPI("login_sms", { phone });

		if (!res.data.valid) verifySMS(phone, dispatch);
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

const verifySMS = async (phone: string, dispatch: Dispatch<AuthType | AlertType>) => {
	const code = prompt("Введите ваш код");
	if (!code) return;

	try {
		dispatch({ type: ALERT, payload: { loading: true } });
		const res = await postAPI("sms_verify", { phone, code });

		dispatch({ type: AUTH, payload: res.data });

		dispatch({ type: ALERT, payload: { success: res.data.msg } });
		localStorage.setItem("logged", "true");
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });

		setTimeout(() => {
			verifySMS(phone, dispatch);
		}, 100);
	}
};

export const forgotPassword = (account: string) =>
	async (dispatch: Dispatch<AuthType | AlertType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await postAPI("forgot_password", { account });
			console.log({res});

			dispatch({ type: ALERT, payload: { success: res.data.msg } });
		} catch (err: any) {
			dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
		}
	};
