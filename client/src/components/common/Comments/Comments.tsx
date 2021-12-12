import React, { FC, useState } from "react";
import { IComment } from "../../../types/CommentTypes";
import AvatarComment from "./AvatarComment/AvatarComment";
import CommentList from "./CommentList/CommentList";
import AvatarReply from "./AvatarReply/AvatarReply";

interface IProps {
	comment: IComment;
}

const Comments: FC<IProps> = ({ comment }) => {
	const [showReply, setShowReply] = useState<IComment[]>([]);

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
					showReply.map((comment, index) => (
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
			</CommentList>
		</div>
	);
};

export default Comments;