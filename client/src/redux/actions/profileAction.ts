import { AUTH, AuthType, IAuth } from '../types/authType';
import { Dispatch } from 'redux';
import { ALERT, AlertType } from '../types/alertType';
import { checkImage } from '../../utils/imageUpload';
import { patchAPI } from '../../api/FetchData';
import { checkPassword } from '../../utils/validate';

export const updateUser =
	(avatar: File, name: string, auth: IAuth) => async (dispatch: Dispatch<AlertType | AuthType>) => {
		if (!auth.access_token || !auth.user) return;

		let url = '';

		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			if (avatar) {
				const check = checkImage(avatar);

				if (check) return dispatch({ type: ALERT, payload: { errors: check } });

				const photo = await imageUpload(avatar);
				url = photo.url;
			}

			dispatch({
				type: AUTH,
				payload: {
					access_token: auth.access_token,
					user: {
						...auth.user,
						avatar: url ? url : auth.user.avatar,
						name: name ? name : auth.user.name,
					},
				},
			});

			const res = await patchAPI(
				'user',
				{
					avatar: url ? url : auth.user.avatar,
					name: name ? name : auth.user.name,
				},
				auth.access_token
			);

			dispatch({ type: ALERT, payload: { success: res.data.msg } });
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
		}
	};

export const resetPassword =
	(password: string, cf_password: string, token: string) =>
	async (dispatch: Dispatch<AlertType | AuthType>) => {
		const msg = checkPassword(password, cf_password);
		if (msg) return dispatch({ type: ALERT, payload: { errors: msg } });

		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await patchAPI('reset_password', { password }, token);

			dispatch({ type: ALERT, payload: { success: res.data.msg } });
		} catch (e: any) {
			dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
		}
	};

export const imageUpload = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', 'povleg10');
	formData.append('cloud_name', 'drw46ajkt');

	const res = await fetch('https://api.cloudinary.com/v1_1/drw46ajkt/image/upload', {
		method: 'POST',
		body: formData,
	});

	const data = await res.json();
	return { public_id: data.public_id, url: data.secure_url };
};
