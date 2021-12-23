import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useHistory, useParams } from "react-router-dom";
import { getBlogsByUserId } from "../../../redux/actions/blogAction";
import { IBlog } from "../../../types/BlogTypes";
import CardHoriz from "../../Blog/CreateBlog/CardHoriz/CardHoriz";
import Pagination from "../../common/Pagination/Pagination";

interface IParams {
	id: string;
}

const UserBlogs = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams<IParams>();

	const [blogs, setBlogs] = useState<IBlog[]>([]);
	const [total, setTotal] = useState(0);

	const { search } = history.location;

	const { blogsUser } = useTypedSelector(state => state.blogs);

	useEffect(() => {
		if (!id) return;

		if (blogsUser.every(item => item.id !== id)) {
			dispatch(getBlogsByUserId(id, search));
		} else {
			const data = blogsUser.find(item => item.id === id);
			if (!data) return;

			setBlogs(data.blogs);
			setTotal(data.total);
			if (data.search) history.push(data.search);
		}
	}, [blogsUser, dispatch, history, id, search]);

	const handleChangePage = (page: number) => {
		const search = `?page=${page}`;
		dispatch(getBlogsByUserId(id, search));
	};

	if (blogs.length === 0 && total < 1) return (
		<h3 className="text-center">Блогов нет</h3>
	);

	return (
		<>
			<div>
				{
					blogs.map(blog => (
						<CardHoriz key={blog._id} blog={blog} />
					))
				}
			</div>

			<Pagination total={total} callback={handleChangePage} />
		</>
	);
};

export default UserBlogs;
