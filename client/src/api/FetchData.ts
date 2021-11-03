import {host} from './axios';

export const postAPI = async (url: string, post: object, token?: string) => {
    return await host.post(`/api/${url}`, post)
};