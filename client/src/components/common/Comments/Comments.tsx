import React, { FC } from "react";
import { IComment } from "../../../types/CommentTypes";
import AvatarComment from "./AvatarComment/AvatarComment";
import CommentList from "./CommentList/CommentList";

interface IProps {
	comment: IComment;
}

const Comments: FC<IProps> = ({ comment }) => {
	return (
		<div className="my-3 d-flex" style={{
			opacity: comment._id ? 1 : .5,
			pointerEvents: comment._id ? "initial" : "none",
		}}>
			<AvatarComment user={comment.user} />
			<CommentList comment={comment} />
		</div>
	);
};

export default Comments;