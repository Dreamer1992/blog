import React, { FC } from "react";
import { IUser } from "../../../../types/Types";
import { Link } from "react-router-dom";
import cn from "./AvatarComment.module.css";

interface IProps {
	user: IUser;
}

const AvatarComment: FC<IProps> = ({ user }) => {
	return (
		<div className={cn.avatarComment}>
			<img src={user.avatar} alt="avatar" />

			<small className="d-block text-break">
				<Link to={`/profile/${user._id}`}>
					{user.name}
				</Link>
			</small>
		</div>
	);
};

export default AvatarComment;