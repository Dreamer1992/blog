import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {InputChange, IUserProfile, RootStore} from "../../../types/Types";
import cn from './UserInfo.module.css';
import NotFoundPage from "../../../pages/NotFoundPage";

const UserInfo = () => {
    const initialState = {
        name: '', account: '', avatar: '', password: '', cf_password: '',
    }

    const dispatch = useDispatch();
    const {auth} = useSelector((state: RootStore) => state);

    const [user, setUser] = useState<IUserProfile>(initialState);
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const handleChangeInput = (e: InputChange) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleChangeAvatar = (e: InputChange) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;

        console.log('files', files);

        if (files) {
            const file = files[0];
            setUser({...user, avatar: file});
        }
    }

    const {name, account, avatar, password, cf_password} = user;

    if (!auth.user) return <NotFoundPage/>

    return (
        <form className={cn.profileInfo}>
            <div className={cn.profileInfoAvatar}>
                <img
                    className={cn.avatarImage}
                    src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                    alt="avatar"
                />

                <div className={cn.profileInfoFile}>
                    <label htmlFor="avatar">
                        <i className="fas fa-camera"/>
                        <p>Изменить</p>
                    </label>
                    <div>
                        <input
                            type="file"
                            id="avatar"
                            name="file"
                            accept="image/*"
                            onChange={handleChangeAvatar}
                        />
                    </div>
                </div>
            </div>

            <div className="form-group my-2">
                <label htmlFor="account">Имя</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    defaultValue={auth.user.name}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="form-group my-2">
                <label htmlFor="account">Аккаунт</label>
                <input
                    type="text"
                    className="form-control"
                    id="account"
                    name="account"
                    defaultValue={auth.user.account}
                    onChange={handleChangeInput}
                    disabled={true}
                />
            </div>

            <div className="form-group my-2">
                <label htmlFor="password">Пароль</label>

                <div className={cn.pass}>
                    <input
                        type={typePass ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value="password"
                        onChange={handleChangeInput}
                    />
                    <small
                        className={cn.small}
                        onClick={() => setTypePass(!typePass)}
                    >
                        {typePass ? <i className="far fa-eye-slash"/> : <i className="far fa-eye"/>}
                    </small>
                </div>
            </div>

            <div className="form-group my-2">
                <label htmlFor="cf_password">Подтвердите пароль</label>

                <div className={cn.pass}>
                    <input
                        type={typePass ? "text" : "password"}
                        className="form-control"
                        id="cf_password"
                        name="cf_password"
                        value="password"
                        onChange={handleChangeInput}
                    />
                    <small
                        className={cn.small}
                        onClick={() => setTypeCfPass(!typeCfPass)}
                    >
                        {typePass ? <i className="far fa-eye-slash"/> : <i className="far fa-eye"/>}
                    </small>
                </div>
            </div>

            <button className="btn btn-dark w-100 mt-3" type="submit">
                Обновить
            </button>
        </form>
    );
};

export default UserInfo;