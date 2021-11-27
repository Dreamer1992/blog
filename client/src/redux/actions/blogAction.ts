import { IBlog } from "../../types/BlogTypes";
import { Dispatch } from "redux";
import { ALERT, AlertType } from "../types/alertType";
import { imageUpload } from "./profileAction";
import { getAPI, postAPI } from "../../api/FetchData";
import { BlogTypes, GET_BLOGS } from "../types/blogType";

export const createBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<AlertType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true } });

		let url = "";

		if (typeof blog.thumbnail !== "string") {
			const photo = await imageUpload(blog.thumbnail);
			url = photo.url;
		} else {
			url = blog.thumbnail;
		}

		let newBlog = { ...blog, thumbnail: url };

		await postAPI("blog/create", newBlog, token);

		dispatch({ type: ALERT, payload: { loading: false } });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const getBlogs = () => async (dispatch: Dispatch<AlertType | BlogTypes>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true } });

		const res = await getAPI('blogs');

		dispatch({type: GET_BLOGS, payload: res.data})

		dispatch({ type: ALERT, payload: { loading: false } });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};