import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../../types/Types";
import cn from "./AvatarReply.module.css";

interface IProps {
	user: IUser;
	reply_user?: IUser;
}

const AvatarReply: FC<IProps> = ({ user, reply_user }) => {
	return (
		<div className={cn.avatarReply}>
			<img src={user.avatar} alt="Фото" />

			<div className="ms-3">
				<small className={cn.userName}>
					<Link to={`/profile/${user._id}`}>
						{user.name}
					</Link>
				</small>

				<small className={cn.replyText}>
					<span className="mx-1">ответил</span>
					<Link to={`/profile/${reply_user?._id}`}>
						{reply_user?.name}
					</Link>
				</small>
			</div>
		</div>
	);
};

export default AvatarReply;