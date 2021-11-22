import { host } from './axios';

let headers: any = {};

export const postAPI = async (url: string, post: object, token?: string) => {
	if (token) {
		headers['Authorization'] = token;
	}

	return await host.post(`/api/${url}`, post, { headers });
};

export const getAPI = async (url: string, token?: string) => {
	if (token) {
		headers['Authorization'] = token;
	}

	return await host.get(`/api/${url}`, { headers });
};

export const patchAPI = async (url: string, post: object, token?: string) => {
	if (token) {
		headers['Authorization'] = token;
	}

	return await host.patch(`api/${url}`, post, { headers });
};

export const deleteAPI = async (url: string, token?: string) => {
	if (token) {
		headers['Authorization'] = token;
	}

	return await host.delete(`api/${url}`, { headers });
};
