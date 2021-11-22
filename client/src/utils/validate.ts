import { IUserRegister } from '../types/Types';

export const validateRegister = (data: IUserRegister) => {
	const { name, account, password, cf_password } = data;
	let errors: string | string[] = [];

	if (!name) {
		errors.push('Укажите Ваше имя');
	} else if (name.length > 20) {
		errors.push('Имя должно быть не больше 20-ти символов');
	}

	if (!account) {
		errors.push('Укажите почту или номер телефона');
	} else if (!validatePhone(account) && !validateEmail(account)) {
		errors.push('Неверный формат электронной почты или номера телефона');
	}

	const msg = checkPassword(password, cf_password);
	if (msg) errors.push(msg);

	return {
		errMsg: errors,
		errLength: errors.length,
	};
};

export const checkPassword = (password: string, cf_password: string) => {
	if (password.length < 6) {
		return 'Пароль должен быть больше 5 символов';
	} else if (password !== cf_password) {
		return 'Пароли должны быть одинаковыми';
	}
};

export function validatePhone(phone: string) {
	const res = /^[+]/g;
	return res.test(phone);
}

export function validateEmail(email: string) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}