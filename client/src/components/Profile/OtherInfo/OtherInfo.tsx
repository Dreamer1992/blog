import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { getOtherInfo } from "../../../redux/actions/userAction";
import cn from "./OtherInfo.module.css";

interface IProps {
	id: string;
}

const OtherInfo: FC<IProps> = ({ id }) => {
	const dispatch = useDispatch();
	const { info } = useTypedSelector((state) => state.profile);

	useEffect(() => {
		dispatch(getOtherInfo(id));
	}, [dispatch, id]);

	if (!info) return null;

	return (
		<div className={`${cn.profileInfo} shadow text-center`}>
			<div className={cn.profileInfoAvatar}>
				<img
					className={cn.avatarImage}
					src={info.avatar}
					alt="avatar"
				/>
			</div>

			<h5 className="text-uppercase text-danger">
				{info.name}
			</h5>

			<div>Роль: <span className="text-info ms-1">{info.role}</span></div>

			<div>Почта / номер телефона:</div>
			<div className="text-info">{info.account}</div>

			<div>Дата создания:<span className="text-warning ms-1">
				{new Date(info.createdAt).toLocaleString()}
			</span></div>
		</div>
	);
};

export default OtherInfo;
