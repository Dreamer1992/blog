import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getBlogs } from "../../redux/actions/blogAction";

const BlogHomePage = () => {
	const dispatch = useDispatch();

	const blogs = useTypedSelector(state => state.blogs);
	console.log('blogs', blogs);

	useEffect(() => {
		dispatch(getBlogs());
	}, [dispatch]);

	return <div className="container">Home</div>;
};

export default BlogHomePage;
