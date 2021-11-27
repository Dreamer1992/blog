import { BlogTypes, GET_BLOGS, IBlogs } from "../types/blogType";


const blogReducer = (state: IBlogs[] = [], action: BlogTypes): IBlogs[] => {
	switch (action.type) {
		case GET_BLOGS:
			return action.payload;
		default:
			return state;
	}
};

export default blogReducer;