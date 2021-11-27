import { BlogTypes, GET_BLOGS, GET_BLOGS_BY_CATEGORY_ID } from "../types/blogType";
import { IBlogByCategoryId, IBlogs } from "../../types/BlogTypes";

type InitialStateType = {
	blogs: IBlogs[];
	blogsCategory: IBlogByCategoryId[];
}

const initialState: InitialStateType = {
	blogs: [],
	blogsCategory: [],
};

const blogReducer = (state = initialState, action: BlogTypes): InitialStateType => {
	switch (action.type) {
		case GET_BLOGS:
			return { ...state, blogs: action.payload };
		case GET_BLOGS_BY_CATEGORY_ID:
			return { ...state, blogsCategory: [action.payload] };
		default:
			return state;
	}
};

export default blogReducer;