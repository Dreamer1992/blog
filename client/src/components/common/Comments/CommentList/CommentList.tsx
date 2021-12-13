import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IComment } from "../../../../types/CommentTypes";
import cn from "./CommentList.module.css";
import CommentInput from "../CommentInput/CommentInput";
import { deleteComment, replyComments, updateComment } from "../../../../redux/actions/commentAction";

interface IProps {
	comment: IComment;
	showReply: IComment[];
	setShowReply: (showReply: IComment[]) => void;
}

const CommentList: FC<IProps> = ({
									 children,
									 comment,
									 showReply,
									 setShowReply,
								 }) => {
	const dispatch = useDispatch();
	const { auth } = useTypedSelector(state => state);
	const [onReply, setOnReply] = useState(false);

	const [edit, setEdit] = useState<IComment>();

	const handleReply = (body: string) => {
		if (!auth.user || !auth.access_token) return;

		const data = {
			user: auth.user,
			blog_id: comment.blog_id,
			blog_user_id: comment.blog_user_id,
			content: body,
			reply_user: comment.user,
			comment_root: comment.comment_root || comment._id,
			createdAt: new Date().toISOString(),
		};

		setShowReply([data, ...showReply]);
		setOnReply(false);

		dispatch(replyComments(data, auth.access_token));
	};

	const handleUpdate = (body: string) => {
		if (!auth.user || !auth.access_token || !edit) return;

		if (body === edit.content)
			return setEdit(undefined);

		const newComment = { ...edit, content: body };

		dispatch(updateComment(newComment, auth.access_token));

		setEdit(undefined);
	};

	const handleDelete = (comment: IComment) => {
		if (!auth.user || !auth.access_token) return;

		dispatch(deleteComment(comment, auth.access_token));
	};

	const Nav = (comment: IComment) => {
		return (
			<>
				<i className="fas fa-trash-alt mx-2"
				   onClick={() => handleDelete(comment)}
				/>
				<i className="fas fa-edit me-2"
				   onClick={() => setEdit(comment)}
				/>
			</>
		);
	};

	return (
		<div className="w-100">
			{
				edit
					? <CommentInput
						callback={handleUpdate}
						edit={edit}
						setEdit={setEdit}
					/>
					: (
						<div className={cn.commentWrapper}>
							<div className="p-2"
								 dangerouslySetInnerHTML={{
									 __html: comment.content,
								 }} />

							<div className="d-flex justify-content-between p-2">
								<small className="text-secondary"
									   style={{ cursor: "pointer" }}
									   onClick={() => setOnReply(!onReply)}
								>
									{onReply ? "Отменить" : "Ответить"}
								</small>

								<small className={cn.commentNavWrapper}>
									<div className={cn.commentNav}>
										{
											comment.blog_user_id === auth.user?._id
												? comment.user._id === auth.user._id
													? Nav(comment)
													: <i className="fas fa-trash-alt mx-2"
														 onClick={() => handleDelete(comment)}
													/>
												: comment.user._id === auth.user?._id && Nav(comment)
										}
									</div>
									{new Date(comment.createdAt).toLocaleString()}
								</small>
							</div>
						</div>
					)
			}

			{onReply && <CommentInput callback={handleReply} />}

			{children}
		</div>
	);
};

export default CommentList;