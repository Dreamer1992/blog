import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IBlog } from "../../../types/BlogTypes";
import CommentInput from "../../common/Comments/CommentInput";
import { IUser } from "../../../types/Types";
import { IComment } from "../../../types/CommentTypes";

interface IProps {
	blog: IBlog;
}

const DetailBlog: FC<IProps> = ({ blog }) => {
	const auth = useTypedSelector(state => state.auth);

	const [showComments, setShowComments] = useState<IComment[]>([]);

	const handleComment = (body: string) => {
		if (!auth) return;

		const data = {
			content: body,
			user: auth.user,
			blog_id: (blog._id as string),
			blog_user_id: (blog.user as IUser)._id,
			createdAt: new Date().toISOString(),
		};

		setShowComments([data, ...showComments]);
	};

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
		</div>
	);
};

export default DetailBlog;