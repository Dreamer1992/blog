import React from 'react';
import Profile from '../components/Profile/Profile';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "../types/Types";

interface IParams {
	id: string;
}

const ProfilePage = () => {
	const { id }: IParams = useParams();
	const { auth } = useSelector((state: RootStore) => state);

	return <Profile auth={auth} id={id} />;
};

export default ProfilePage;
