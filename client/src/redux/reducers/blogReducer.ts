import { BlogTypes, GET_BLOGS, GET_BLOGS_BY_CATEGORY_ID, GET_BLOGS_BY_USER_ID } from "../types/blogType";
import { IBlogByCategoryId, IBlogByUserId, IBlogs } from "../../types/BlogTypes";

type InitialStateType = {
	blogs: IBlogs[];
	blogsCategory: IBlogByCategoryId[];
	blogsUser: IBlogByUserId[];
}

const initialState: InitialStateType = {
	blogs: [],
	blogsCategory: [],
	blogsUser: [],
};

const blogReducer = (state = initialState, action: BlogTypes): InitialStateType => {
	switch (action.type) {
		case GET_BLOGS:
			return { ...state, blogs: action.payload };

		case GET_BLOGS_BY_CATEGORY_ID:
			if (state.blogsCategory.every(item => item.id !== action.payload.id)) {
				return { ...state, blogsCategory: [action.payload] };
			} else {
				const blogsCategory = state.blogsCategory.map(blog => (
					blog.id === action.payload.id
						? action.payload
						: blog
				));

				return { ...state, blogsCategory };
			}

		case GET_BLOGS_BY_USER_ID:
			if (state.blogsUser.every(item => item.id !== action.payload.id)) {
				return { ...state, blogsUser: [action.payload] };
			} else {
				const blogsUser = state.blogsUser.map(blog => (
					blog.id === action.payload.id
						? action.payload
						: blog
				));

				return { ...state, blogsUser };
			}

		default:
			return state;
	}
};

export default blogReducer;