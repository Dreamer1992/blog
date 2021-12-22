import React, { useEffect, useState } from "react";
import { getAPI } from "../../../api/FetchData";
import { IBlog } from "../../../types/BlogTypes";
import CardHoriz from "../../Blog/CreateBlog/CardHoriz/CardHoriz";
import { useLocation } from "react-router-dom";

const Search = () => {
	const [search, setSearch] = useState("");
	const [blogs, setBlogs] = useState<IBlog[]>([]);

	const { pathname } = useLocation();

	useEffect(() => {
		const delayDebounce = setTimeout(async () => {
			if (search.length < 2) return setBlogs([]);

			try {
				const res = await getAPI(`search/blogs?title=${search}`);
				setBlogs(res.data);
				console.log(blogs);
			} catch (e) {
				console.log(e);
			}
		}, 400);

		return () => clearTimeout(delayDebounce);
	}, [search]);

	useEffect(() => {
		setSearch("");
		setBlogs([]);
	}, [pathname]);

	return (
		<div className="search col-12 col-lg-6 position-relative mx-auto">
			<input
				type="text"
				className="form-control me-2 w-100 my-2"
				value={search}
				placeholder="Поиск..."
				onChange={(e) => setSearch(e.target.value)}
			/>

			{
				search.length >= 2 && (
					<div className="position-absolute pt-2 px-1 w-100 rounded"
						 style={{
							 background: "#eee", zIndex: 10,
							 maxHeight: "calc(100vh - 100px)",
							 overflow: "auto",
						 }}>
						{
							blogs.length
								? blogs.map(blog => (
									<CardHoriz key={blog._id} blog={blog} />
								))
								: <h3 className="text-center">Блогов нет</h3>
						}
					</div>
				)
			}
		</div>
	);
};

export default Search;
