import { IBlog } from "../../types/BlogTypes";
import { Dispatch } from "redux";
import { ALERT, AlertType } from "../types/alertType";
import { imageUpload } from './profileAction';
import { postAPI } from '../../api/FetchData';

export const createBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<AlertType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true } });

		let url = "";

		if (typeof blog.thumbnail !== 'string') {
			const photo = await imageUpload(blog.thumbnail);
			url = photo.url;
		} else {
			url = blog.thumbnail;
		}

		let newBlog = { ...blog, thumbnail: url };

		const res = await postAPI('blog/create', newBlog, token);

		dispatch({ type: ALERT, payload: { loading: false } });
		console.log({ newBlog, token });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};
