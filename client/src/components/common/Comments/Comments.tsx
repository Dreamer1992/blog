import React, { FC, useEffect, useState } from "react";
import { IComment } from "../../../types/CommentTypes";
import AvatarComment from "./AvatarComment/AvatarComment";
import CommentList from "./CommentList/CommentList";
import AvatarReply from "./AvatarReply/AvatarReply";

interface IProps {
	comment: IComment;
}

const Comments: FC<IProps> = ({ comment }) => {
	const [showReply, setShowReply] = useState<IComment[]>([]);
	const [next, setNext] = useState(2);

	useEffect(() => {
		if (!comment.replyCM) return;
		setShowReply(comment.replyCM);
	}, [comment.replyCM]);

	return (
		<div className="my-3 d-flex" style={{
			opacity: comment._id ? 1 : .5,
			pointerEvents: comment._id ? "initial" : "none",
		}}>
			<AvatarComment user={comment.user} />
			<CommentList
				comment={comment}
				showReply={showReply}
				setShowReply={setShowReply}
			>
				{
					showReply.slice(0, next).map((comment, index) => (
						<div key={index} style={{
							opacity: comment._id ? 1 : .5,
							pointerEvents: comment._id ? "initial" : "none",
						}}>
							<AvatarReply
								user={comment.user}
								reply_user={comment.reply_user}
							/>
							<CommentList
								comment={comment}
								showReply={showReply}
								setShowReply={setShowReply}
							/>
						</div>
					))
				}

				<div style={{ cursor: "pointer" }}>
					{
						showReply.length - next > 0
							? (
								<small
									className="text-info"
									onClick={() => setNext(next + 5)}
								>
									Показать больше
								</small>
							)
							: showReply.length > 2 &&
							(
								<small
									className="text-info"
									onClick={() => setNext(2)}
								>
									Скрыть
								</small>
							)
					}
				</div>

			</CommentList>
		</div>
	);
};

export default Comments;