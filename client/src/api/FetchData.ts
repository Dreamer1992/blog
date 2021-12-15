import { instance } from "./axios";

let headers: any = {};

export const postAPI = async (url: string, post: object, token?: string) => {
	if (token) {
		headers["Authorization"] = token;
	}

	return await instance.post(`${url}`, post, { headers });
};

export const getAPI = async (url: string, token?: string) => {
	if (token) {
		headers["Authorization"] = token;
	}

	return await instance.get(`${url}`, { headers });
};

export const patchAPI = async (url: string, post: object, token?: string) => {
	if (token) {
		headers["Authorization"] = token;
	}

	return await instance.patch(`${url}`, post, { headers });
};

export const deleteAPI = async (url: string, token?: string) => {
	if (token) {
		headers["Authorization"] = token;
	}

	return await instance.delete(`${url}`, { headers });
};

export const putAPI = async (url: string, post: object, token?: string) => {
	if (token) {
		headers["Authorization"] = token;
	}

	return await instance.put(`${url}`, post, { headers });
};
