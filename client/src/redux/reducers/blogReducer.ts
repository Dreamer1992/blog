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
			if (state.blogsCategory.every(item => item.id !== action.payload.id)) {
				return { ...state, blogsCategory: [action.payload] };
			} else {
				return {
					...state, blogsCategory: state.blogsCategory.map(blog => (
						blog.id === action.payload.id
							? action.payload
							: blog
					)),
				};
			}

		default:
			return state;
	}
};

export default blogReducer;