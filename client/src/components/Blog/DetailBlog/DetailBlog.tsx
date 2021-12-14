import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IBlog } from "../../../types/BlogTypes";
import CommentInput from "../../common/Comments/CommentInput/CommentInput";
import { IUser } from "../../../types/Types";
import { IComment } from "../../../types/CommentTypes";
import Comments from "../../common/Comments/Comments";
import { createComment, getComments } from "../../../redux/actions/commentAction";
import Pagination from "../../common/Pagination/Pagination";

interface IProps {
	blog: IBlog;
}

const DetailBlog: FC<IProps> = ({ blog }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { auth, comments } = useTypedSelector(state => state);

	const [showComments, setShowComments] = useState<IComment[]>([]);

	const fetchComments = useCallback(async (id: string, page = 1) => {
		await dispatch(getComments(id, page));
	}, [dispatch]);

	const handleComment = (body: string) => {
		if (!auth.user || !auth.access_token) return;

		const data = {
			content: body,
			user: auth.user,
			blog_id: (blog._id as string),
			blog_user_id: (blog.user as IUser)._id,
			replyCM: [],
			createdAt: new Date().toISOString(),
		};

		setShowComments([data, ...showComments]);
		dispatch(createComment(data, auth.access_token));
	};

	const handlePagination = (page: number) => {
		if (!blog._id) return;
		fetchComments(blog._id, page);
	};

	useEffect(() => {
		setShowComments(comments.data);
	}, [comments.data]);

	useEffect(() => {
		if (!blog._id) return;

		const page = history.location.search.slice(6) || 1;
		fetchComments(blog._id, page);
	}, [blog._id, fetchComments, history]);

	return (
		<div>
			<h2 className="text-warning my-3 fs-1">{blog.title}</h2>

			<h6 className="text-end text-dark fst-italic">
				<small>
					{
						typeof (blog.user) !== "string" && (
							`Автор: ${blog.user.name} `
						)
					}
				</small>

				<small className="ms-2">
					{new Date(blog.createdAt).toLocaleString()}
				</small>
			</h6>

			<div dangerouslySetInnerHTML={{
				__html: blog.content,
			}} />

			<h3 className="text-warning mb-3 mt-5">Комментарии</h3>

			{
				auth.user
					? <CommentInput callback={handleComment} />
					: (
						<h6 className="mb-5">
							<Link to={`/login?blog/${blog._id}`}>Авторизуйтесь</Link>, чтобы оставить комментарий
						</h6>
					)
			}

			{
				showComments?.map((comment, index) => (
					<Comments key={index} comment={comment} />
				))
			}

			{
				comments.total > 1 && (
					<Pagination
						total={comments.total}
						callback={handlePagination}
					/>
				)
			}
		</div>
	);
};

export default DetailBlog;