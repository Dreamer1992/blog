import { IBlog } from "../../types/BlogTypes";
import { Dispatch } from "redux";
import { ALERT, AlertType } from "../types/alertType";
import { imageUpload } from "./userAction";
import { getAPI, postAPI, putAPI } from "../../api/FetchData";
import { BlogTypes, GET_BLOGS, GET_BLOGS_BY_CATEGORY_ID, GET_BLOGS_BY_USER_ID } from "../types/blogType";

export const createBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<AlertType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true } });

		let url;

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

		const res = await getAPI("blogs");

		dispatch({ type: GET_BLOGS, payload: res.data });

		dispatch({ type: ALERT, payload: { loading: false } });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const getBlogsByCategoryId = (id: string, search: string) => async (dispatch: Dispatch<AlertType | BlogTypes>) => {
	try {
		let limit = 4;
		let page = search ? search : `?page=${1}`;

		dispatch({ type: ALERT, payload: { loading: true } });

		const res = await getAPI(`blogs/category/${id}${page}&limit=${limit}`);

		dispatch({ type: GET_BLOGS_BY_CATEGORY_ID, payload: { ...res.data, id, search } });

		dispatch({ type: ALERT, payload: { loading: false } });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const getBlogsByUserId = (id: string, search: string) => async (dispatch: Dispatch<AlertType | BlogTypes>) => {
	try {
		let limit = 3;
		let page = search ? search : `?page=${1}`;

		dispatch({ type: ALERT, payload: { loading: true } });

		const res = await getAPI(`blogs/user/${id}${page}&limit=${limit}`);

		dispatch({ type: GET_BLOGS_BY_USER_ID, payload: { ...res.data, id, search } });

		dispatch({ type: ALERT, payload: { loading: false } });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};

export const updateBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<AlertType>) => {
	try {
		dispatch({ type: ALERT, payload: { loading: true } });

		let url;

		if (typeof blog.thumbnail !== "string") {
			const photo = await imageUpload(blog.thumbnail);
			url = photo.url;
		} else {
			url = blog.thumbnail;
		}

		let newBlog = { ...blog, thumbnail: url };

		const res = await putAPI(`blog/${newBlog._id}`, newBlog, token);

		dispatch({ type: ALERT, payload: { success: res.data.msg } });
	} catch (e: any) {
		dispatch({ type: ALERT, payload: { errors: e.response.data.msg } });
	}
};