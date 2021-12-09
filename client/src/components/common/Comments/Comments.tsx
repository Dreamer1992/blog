import React, { FC } from "react";
import { IComment } from "../../../types/CommentTypes";
import AvatarComment from "./AvatarComment/AvatarComment";
import CommentList from "./CommentList/CommentList";

interface IProps {
	comment: IComment;
}

const Comments: FC<IProps> = ({ comment }) => {
	return (
		<div className="my-3 d-flex">
			<AvatarComment user={comment.user} />
			<CommentList comment={comment} />
		</div>
	);
};

export default Comments;