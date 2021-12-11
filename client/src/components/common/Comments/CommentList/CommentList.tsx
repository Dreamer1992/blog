import React, { FC } from "react";
import { IComment } from "../../../../types/CommentTypes";
import cn from "./CommentList.module.css";

interface IProps {
	comment: IComment;
}

const CommentList: FC<IProps> = ({ comment }) => {
	return (
		<div className="w-100">
			<div className={cn.commentWrapper}>
				<div className="p-2"
					 dangerouslySetInnerHTML={{
						 __html: comment.content,
					 }} />

				<div className="d-flex justify-content-between p-2">
					<small className="text-info" style={{ cursor: "pointer" }}>
						Ответить
					</small>

					<small>
						{new Date(comment.createdAt).toLocaleString()}
					</small>
				</div>
			</div>
		</div>
	);
};

export default CommentList;