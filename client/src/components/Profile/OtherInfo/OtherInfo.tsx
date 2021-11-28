import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherInfo } from "../../../redux/actions/authAction";

interface IProps {
	id: string;
}

const OtherInfo: FC<IProps> = ({ id }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOtherInfo(id));
	}, [dispatch]);

	return <div>{id}</div>;
};

export default OtherInfo;
