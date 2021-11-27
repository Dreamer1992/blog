import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getBlogs } from "../../redux/actions/blogAction";
import HomeBlog from "../../components/Blog/HomeBlog/HomeBlog";

const BlogHomePage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBlogs());
	}, [dispatch]);

	const blogs = useTypedSelector(state => state.blogs);

	return <HomeBlog blogs={blogs} />;
};

export default BlogHomePage;
