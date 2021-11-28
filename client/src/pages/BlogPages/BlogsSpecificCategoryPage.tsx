import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useHistory, useParams } from "react-router-dom";
import BlogsSpecificCategory from "../../components/Blog/BlogsSpecificCategory/BlogsSpecificCategory";
import { IBlogsSpecificCategoryParams } from "../../types/Types";
import { getCategories } from "../../redux/actions/categoryAction";
import { getBlogsByCategoryId } from "../../redux/actions/blogAction";
import { IBlog } from "../../types/BlogTypes";

const BlogsSpecificCategoryPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { category_name } = useParams<IBlogsSpecificCategoryParams>();
	const [blogs, setBlogs] = useState<IBlog[] | null>(null);
	const [total, setTotal] = useState<number>(0);

	const { search } = history.location;

	// get all categories
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	const { categories, blogs: { blogsCategory } } = useTypedSelector(state => state);

	// get specific category
	useEffect(() => {
		const category = categories.find(item => item.name === category_name);
		if (category) setCategoryId(category._id);
	}, [dispatch, categories, category_name]);

	const [categoryId, setCategoryId] = useState("");

	// get all blogs by specific category
	useEffect(() => {
		if (!categoryId) return;

		if (blogsCategory.every(item => item.id !== categoryId)) {
			dispatch(getBlogsByCategoryId(categoryId, search));
		} else {
			const data = blogsCategory.find(item => item.id === categoryId);
			if (!data) return;

			const { blogs, total } = data;

			setBlogs(blogs);
			setTotal(total);

			if (data.search) history.push(data.search);
		}
	}, [dispatch, categoryId, blogsCategory, blogs, total, search, history]);

	const handleChangePage = (page: number) => {
		const search = `?page=${page}`;
		dispatch(getBlogsByCategoryId(categoryId, search));
	};

	if (!blogs?.length) return null;

	return <BlogsSpecificCategory blogs={blogs} total={total} callback={handleChangePage} />;
};

export default BlogsSpecificCategoryPage;