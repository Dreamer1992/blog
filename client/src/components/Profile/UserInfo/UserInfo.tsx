import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {InputChange, RootStore} from "../../../types/Types";
import cn from './UserInfo.module.css';

const UserInfo = () => {
    const initialState = {
        name: '', account: '', avatar: '', password: '', cf_password: '',
    }

    const dispatch = useDispatch();
    const {auth} = useSelector((state: RootStore) => state);

    const [user, setUser] = useState(initialState);
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfType] = useState(false);

    const handleChangeInput = (e: InputChange) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const {name, account, avatar, password, cf_password} = user;

    return (
        <form className={cn.profileInfo}>
            <div className="info_avatar">
                <img className={cn.profileInfoAvatar} src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar}
                     alt="avatar"/>
            </div>
        </form>
    );
};

export default UserInfo;