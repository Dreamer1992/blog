import React, { FC } from "react";
import UserInfo from "./UserInfo/UserInfo";
import OtherInfo from "./OtherInfo/OtherInfo";
import UserBlogs from "./UserBlogs/UserBlogs";
import { IAuth } from "../../redux/types/authType";

interface IProps {
	auth: IAuth;
	id: string;
}

const Profile: FC<IProps> = ({ auth, id }) => {
	return (
		<div className="container">
			<div className="row my-3">
				<div className="col-md-5 mb-3">
					{
						auth.user?._id === id
							? <UserInfo />
							: <OtherInfo id={id} />
					}
				</div>

				<div className="col-md-7">
					<UserBlogs />
				</div>
			</div>
		</div>
	);
};

export default Profile;
