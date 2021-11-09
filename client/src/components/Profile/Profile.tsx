import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootStore} from "../../types/Types";
import UserInfo from "./UserInfo/UserInfo";
import OtherInfo from "./OtherInfo/OtherInfo";
import UserBlogs from "./UserBlogs/UserBlogs";

interface IParams {
    id: string,
}

const Profile = () => {
    const {id}: IParams = useParams();
    const {auth} = useSelector((state: RootStore) => state);

    return (
        <div className="container">
            <div className="row my-3">
                <div className="col-md-5 mb-3">
                    {
                        auth.user?._id === id
                            ? <UserInfo/>
                            : <OtherInfo/>
                    }
                </div>

                <div className="col-md-7">
                    <UserBlogs/>
                </div>
            </div>
        </div>
    );
};

export default Profile;