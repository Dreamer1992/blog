import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IComment } from "../../../../types/CommentTypes";
import cn from "./CommentList.module.css";
import CommentInput from "../CommentInput/CommentInput";
import { replyComments } from "../../../../redux/actions/commentAction";

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

		setShowReply([...showReply, data]);
		setOnReply(false);

		dispatch(replyComments(data, auth.access_token));
	};

	return (
		<div className="w-100">
			<div className={cn.commentWrapper}>
				<div className="p-2"
					 dangerouslySetInnerHTML={{
						 __html: comment.content,
					 }} />

				<div className="d-flex justify-content-between p-2">
					<small className="text-info"
						   style={{ cursor: "pointer" }}
						   onClick={() => setOnReply(!onReply)}
					>
						{onReply ? "Отменить" : "Ответить"}
					</small>

					<small>
						{new Date(comment.createdAt).toLocaleString()}
					</small>
				</div>
			</div>

			{onReply && <CommentInput callback={handleReply} />}

			{children}
		</div>
	);
};

export default CommentList;